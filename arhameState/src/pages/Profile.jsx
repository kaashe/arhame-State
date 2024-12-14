import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from '../store/user/userSlice';
import { useUpdateUserMutation } from '../store/api/authSlice';
const Profile = () => {
    const fileRef = useRef();
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const currentuser = useSelector((state) => state?.user?.currentuser);
    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm();
    console.log(currentuser, 'currentuser');

    const handleImageUpload = async () => {
        console.log('process started');
        if (!file) return null;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'arham-images'); // Replace with your Cloudinary upload preset
        formData.append('cloud_name', 'dpsioqjsp'); // Replace with your Cloudinary cloud name
        setUploading(true);
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dpsioqjsp/image/upload',
                formData
            );
            const uploadedUrl = response.data.secure_url;
            console.log('Image uploaded:', uploadedUrl);
            return uploadedUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        console.log('Form data before upload:', data);
        let uploadedImageUrl = imageUrl; // Use existing image URL if no new file is uploaded.

        if (file) {
            uploadedImageUrl = await handleImageUpload(); // Upload the file and get the new URL.
        }
        if (uploadedImageUrl || isDirty) {
            const updatedData = { ...data, photoURL: uploadedImageUrl };
            console.log('Form data after adding photoURL:', updatedData);
            try {
                const response = await updateUser({ id: currentuser?._id || currentuser?.id, user: updatedData });
                console.log('API response:', response?.data);
                if (response?.data) {
                    dispatch(
                        signInSuccess({
                            user: response.data.username,
                            email: response.data.email,
                            photoURL: response.data.avatar || uploadedImageUrl,
                            id: response.data._id,
                        })
                    );
                    setImageUrl(uploadedImageUrl); // Sync the component state with the new image URL.
                    console.log('Profile updated successfully.');
                }

            } catch (error) {
                console.error('API error:', error);
            }
        } else {
            console.error('Image upload failed. Form submission aborted.');
        }
    };

    useEffect(() => {
        if (currentuser) {
            reset({
                username: currentuser?.username || currentuser?.user,
                email: currentuser?.email,
                password: '', // Replace with logic for handling passwords.
            });
            setImageUrl(currentuser?.photoURL || currentuser?.avatar || '');
        }
    }, [reset, currentuser]);

    return (
        <div className='px-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7' >Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-2'>
                <input onChange={(e) => setFile(e.target.files[0])} hidden ref={fileRef} type="file" name="" id="" accept='image/*' />
                <img
                    onClick={() => fileRef.current.click()}
                    alt=""
                    src={imageUrl || currentuser?.avatar}
                    className={`cursor-pointer self-center my-2 object-cover size-20 rounded-full ${uploading ? "ring-4 ring-[#009688] animate-pulse" : "ring-2 ring-black "} `}
                />
                <input type="text" id='username' className={`border p-3 rounded-lg ${errors?.username ? 'border-red-400' : ""}`} placeholder="Username" {...register("username", { required: true, maxLength: 20 })} />
                <input type="email" id='email' className={`border p-3 rounded-lg ${errors?.email ? 'border-red-400' : ""}`} placeholder="Email" {...register("email", { required: 'Email required' })} />
                <input type="password" id='password' className={`border p-3 rounded-lg ${errors?.password ? 'border-red-400' : ""}`} placeholder="Password" {...register("password", { required: 'Password is required', maxLength: 8 })} />
                <button disabled={false} className='bg-[#009688] text-white p-2 rounded-md uppercase disabled:opacity-40 hover:opacity-90' type="submit">
                    <span className='flex items-center justify-center gap-2 my-auto'>
                        <span>UPDATE</span>
                        {uploading && <FaSpinner className='mt-[1px] animate-spin' />}
                    </span>
                </button>
                {isSuccess && <p className='text-green-600 text-center'>User Updated!</p>}
                {isError && <p className='text-red-400 text-center'>Failed Updating User!</p>}
                <div className="flex justify-between">
                    <div className="text-red-500">Delete Account</div>
                    <div className="text-red-500">Sign Out</div>
                </div>
            </form>
        </div>
    )
}

export default Profile