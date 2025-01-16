import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from '../store/user/userSlice';
import { useDeleteteUserMutation, useGetListingQuery, useUpdateUserMutation } from '../store/api/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDeleteListingMutation } from '../store/api/listingSlice';
const Profile = () => {
    const fileRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const currentuser = useSelector((state) => state?.user?.currentuser);
    const id = currentuser?._id || currentuser?.id;
    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    const [deleteListing, { isLoading: isDeleteListingIsLoading, isSuccess: isDeleteListingIsSuccess, isError: DeleteListingIsisError, error: errorDeleteListing }] = useDeleteListingMutation();
    const [deleteUser, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: DeleteIsError, error: DeletError }] = useDeleteteUserMutation();
    const { data: listingData, isLoading: isListingLoading, isError: ListingisError, refetch } = useGetListingQuery(id);
    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm();
    console.log(listingData, 'listingData');
    console.log(id, 'user id');


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
    const deleteUserHandler = async (id) => {
        try {
            const response = await deleteUser(id);
            console.log('response', response);
            if (response?.data) {
                setTimeout(() => {
                    dispatch(signInSuccess({}));
                    navigate('/sign-in');
                }, 1000)
            }
        } catch (error) {
            console.log('Error while deleting user', error);
        }
    }
    const signOutUserHandler = async () => {
        try {
            localStorage.clear();

            setTimeout(() => {
                dispatch(signInSuccess({}));
                navigate('/sign-in');
            }, 1000)
        } catch (error) {
            console.log('Error while logging out user', error);
        }
    }
    useEffect(() => {
        if (currentuser) {
            reset({
                username: currentuser?.username || currentuser?.user,
                email: currentuser?.email,
                password: '', // Replace with logic for handling passwords.
            });
            setImageUrl(currentuser?.photoURL || currentuser?.avatar || '');
        }
        if (isDeleteListingIsSuccess) {
            refetch();
        }

    }, [reset, currentuser, isDeleteListingIsSuccess]);
    const handleDelete = async (id) => {
        try {
            await deleteListing(id);
            console.log(id, 'iddd');
        } catch (error) {
            console.log("Error while deleting list item: ", error.message);
        }

    }
    const handleEdit = async (id) => {
        navigate(`/update-listing/${id}`)
    }
    return (
        <>
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
                    <button disabled={isLoading} className='bg-[#009688] text-white p-2 rounded-md uppercase disabled:opacity-40 hover:opacity-90' type="submit">
                        <span className='flex items-center justify-center gap-2 my-auto'>
                            <span>UPDATE</span>
                            {isLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                        </span>
                    </button>
                    <button onClick={() => navigate('/create-listing')} className='bg-[#F9826C] text-white p-2 rounded-md uppercase disabled:opacity-40 hover:opacity-90' type="submit">
                        <span className='flex items-center justify-center gap-2 my-auto'>
                            <span>Create Listing</span>
                        </span>
                    </button>
                    {isSuccess && <p className='text-green-600 text-center'>User Updated!</p>}
                    {isDeleteSuccess && <p className='text-green-600 text-center'>User Deleted!</p>}
                    {isDeleteListingIsSuccess && <p className='text-green-600 text-center'>Listing Deleted!</p>}
                    {isError && <p className='text-red-400 text-center'>Failed Updating User!</p>}
                    {DeleteIsError && <p className='text-red-400 text-center'>Failed Deleting User!</p>}
                    <div className="flex justify-between">
                        <div onClick={() => deleteUserHandler(currentuser?._id)} className={`text-red-500 cursor-pointer ${isDeleteLoading && 'animate-pulse'}`}>Delete Account</div>
                        <div onClick={signOutUserHandler} className="text-red-500 cursor-pointer">Sign Out</div>
                    </div>
                </form>
                {listingData?.length > 0 && <button disabled={isLoading} onClick={() => refetch()} className='text-[#009688] text-center mt-6 w-full' type="submit">
                    <span className='flex items-center justify-center gap-2 my-auto'>
                        <span>Show Listing </span>
                        {isListingLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                    </span>
                </button>}

            </div>
            {listingData?.map((list, id) => {
                return (<div key={id} className="flex justify-between py-3 max-w-xl mx-auto">
                    <div className="flex justify-between items-center gap-2">
                        {/* You can display an image if needed */}
                        {list?.imageUrls && list.imageUrls[0] && (
                            <img src={list?.imageUrls[0]} alt={list.name} className="p-1 w-28 rounded border-2 border-[#F9826C] h-20 object-cover" />
                        )}
                        <p>{list?.name}</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => handleDelete(list?._id)} disabled={isDeleteListingIsLoading} className='text-red-600 ' type="submit">
                            <span className='flex items-center justify-center gap-2 my-auto'>
                                <span>Delete</span>
                                {isLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                            </span>
                        </button>
                        <button onClick={() => handleEdit(list?._id)} disabled={isLoading} className='text-[#009688]' type="submit">
                            <span className='flex items-center justify-center gap-2 my-auto'>
                                <span>Edit</span>
                                {isLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                            </span>
                        </button>
                    </div>
                </div>)
            })}
        </>
    )
}

export default Profile