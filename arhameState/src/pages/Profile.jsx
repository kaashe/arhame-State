import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import axios from 'axios';
const Profile = () => {
    const fileRef = useRef();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const currentuser = useSelector((state) => state?.user?.currentuser);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const handleImageUpload = async () => {
        console.log('process started');

        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset
        formData.append('cloud_name', 'dpsioqjsp'); // Replace with your Cloudinary cloud name

        setUploading(true);
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dpsioqjsp/image/upload',
                formData
            );
            setImageUrl(response.data.secure_url);
            return response.data.secure_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        console.log('Form data before upload:', data);
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl) {
            const updatedData = { ...data, photoURL: uploadedImageUrl };
            console.log('Form data after adding photoURL:', updatedData);

            // Send `updatedData` to your API
            try {
                // const response = await yourApiCall(updatedData);
                console.log('API response:', response);
            } catch (error) {
                console.error('API error:', error);
            }
        } else {
            console.error('Image upload failed. Form submission aborted.');
        }
    };

    useEffect(() => {
        reset({ username: currentuser?.user, ...currentuser, password: 'tes' });
        setImageUrl(currentuser?.photoURL || '');
    }, [reset, currentuser]);
    return (
        <div className='px-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7' >Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-2'>
                <input onChange={(e) => setFile(e.target.files[0])} hidden ref={fileRef} type="file" name="" id="" accept='image/*' />
                <img
                    onClick={() => fileRef.current.click()}
                    alt=""
                    src={imageUrl || "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    className="cursor-pointer self-center my-2 object-cover size-20 rounded-full ring-2 ring-black"
                />
                <input type="text" id='username' className={`border p-3 rounded-lg ${errors?.username ? 'border-red-400' : ""}`} placeholder="Username" {...register("username", { required: true, maxLength: 20 })} />
                <input type="email" id='email' className={`border p-3 rounded-lg ${errors?.email ? 'border-red-400' : ""}`} placeholder="Email" {...register("email", { required: 'Email required', maxLength: 20 })} />
                <input type="password" id='password' className={`border p-3 rounded-lg ${errors?.password ? 'border-red-400' : ""}`} placeholder="Password" {...register("password", { required: 'Password is required', maxLength: 8 })} />
                <button disabled={false} className='bg-[#009688] text-white p-2 rounded-md uppercase disabled:opacity-40 hover:opacity-90' type="submit">
                    <span className='flex items-center justify-center gap-2 my-auto'>
                        <span>UPDATE</span>
                        {1 == 1 && <FaSpinner className='mt-[1px] animate-spin' />}
                    </span>
                </button>
                <div className="flex justify-between">
                    <div className="text-red-500">Delete Account</div>
                    <div className="text-red-500">Sign Out</div>
                </div>
            </form>
        </div>
    )
}

export default Profile