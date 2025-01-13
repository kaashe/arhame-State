import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useCreateListingMutation } from '../store/api/listingSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const currentuser = useSelector((state) => state?.user?.currentuser);
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm();
    const [file, setFile] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [createListing, { isLoading: isCreateListingLoading, isSuccess: isCreateListingSuccess, isError: CreateListingIsError, error: CreateListingrror }] = useCreateListingMutation();

    const handleImageUpload = async (selectedFiles) => {
        const uploadedUrls = [];

        for (let i = 0; i < selectedFiles?.length; i++) {
            const formData = new FormData();
            formData.append('file', selectedFiles[i]);
            formData.append('upload_preset', 'arham-images'); // Replace with your Cloudinary upload preset
            formData.append('cloud_name', 'dpsioqjsp'); // Replace with your Cloudinary cloud name

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dpsioqjsp/image/upload', formData);
                uploadedUrls?.push(response?.data.secure_url); // Collect the URL for each uploaded image
            } catch (error) {
                console.error('Image upload failed:', error);
                setImageError('Failed to upload images. Please try again.');
                return [];
            }
        }

        return uploadedUrls;
    }


    const handleImageChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (file?.length + selectedFiles?.length > 6) {
            setImageError("You can select a maximum of 6 images.");
            return; // Prevent further action if max limit exceeded
        }
        if (file?.length + selectedFiles?.length < 1) {
            setImageError("You must upload at least one image");
            return; // Prevent further action if max limit exceeded
        }

        setUploading(true);

        const uploadedUrls = await handleImageUpload(selectedFiles);
        if (uploadedUrls?.length > 0) {
            setFile((prevFiles) => [...prevFiles, ...uploadedUrls]); // Update state with uploaded image URLs
        }

        setUploading(false);
    }
    const onSubmit = async (data) => {
        if (file?.length < 1) {
            setImageError("You must upload at least one image");
            return; // Prevent further action if max limit exceeded
        }
        if (data?.regularPrice < data?.discountPrice) {
            setImageError("Regular price must be higher then discount price");
            return; // Prevent further action if max limit exceeded
        }
        const payload = { imageUrls: file, userRef: currentuser?._id || currentuser?.id, ...data };
        try {
            const response = await createListing(payload);
            console.log('response saving', response?.data);
            if (response?.data?.status === 201) {
                reset()
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (error) {
            console.error('Error while creating list:', error);
        }
        console.log(payload);

    }

    return (
        <main className='p-3 mx-auto max-w-4xl'>
            <h1 className='text-3xl text-center font-semibold my-7'>Create Listing</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row gap-3 sm:gap-6'>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" id='name' className={`border p-3 rounded-lg ${errors?.name ? 'border-red-400' : ""}`} placeholder="Name" {...register("name", { required: 'Name is required', minLength: 10, maxLength: 62 })} />
                    <textarea type="text" id='description' className={`bg-[#E8F0FE] border p-3 rounded-lg ${errors?.description ? 'border-red-400' : ""}`} placeholder="Description" {...register("description", { required: 'Description is required' })} />
                    <input type="text" id='address' className={`border p-3 rounded-lg ${errors?.address ? 'border-red-400' : ""}`} placeholder="Address" {...register("address", { required: 'Address is required' })} />
                    <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                        {/* Sale Checkbox */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5 h-5 border-2 rounded-sm border-gray-800"
                                {...register("sale")}
                            />
                            <label
                                htmlFor="sale"
                                className="cursor-pointer text-black"
                            >
                                Sale
                            </label>
                        </div>

                        {/* Rent Checkbox */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5 h-5 border-2 rounded-sm border-gray-800"
                                {...register("rent")}
                            />
                            <label
                                htmlFor="rent"
                                className="cursor-pointer text-black"
                            >
                                Rent
                            </label>
                        </div>

                        {/* Parking Checkbox */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5 h-5 border-2 rounded-sm border-gray-800"
                                {...register("parking")}
                            />
                            <label
                                htmlFor="parking"
                                className="cursor-pointer text-black"
                            >
                                Parking Spot
                            </label>
                        </div>

                        {/* Furnished Checkbox */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5 h-5 border-2 rounded-sm border-gray-800"
                                {...register("furnished")}
                            />
                            <label
                                htmlFor="furnished"
                                className="cursor-pointer text-black"
                            >
                                Furnished
                            </label>
                        </div>

                        {/* Offer Checkbox */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5 h-5 border-2 rounded-sm border-gray-800"
                                {...register("offer")}
                            />
                            <label
                                htmlFor="offer"
                                className="cursor-pointer text-black"
                            >
                                Offer
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-0">
                        {/* Number of Beds */}
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <input
                                type="number"
                                id="bedrooms"
                                placeholder="Bedrooms"
                                className={`w-full p-2 border rounded-md focus:outline-none ${errors?.bedrooms ? 'border-red-400' : 'border-gray-800'
                                    }`}
                                {...register("bedrooms", { required: true, min: 1 })}
                            />
                        </div>

                        {/* Number of Bathrooms */}
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <input
                                type="number"
                                id="bathrooms"
                                placeholder="Bathrooms"
                                className={`w-full p-2 border rounded-md focus:outline-none ${errors?.bathrooms ? 'border-red-400' : 'border-gray-800'
                                    }`}
                                {...register("bathrooms", { required: true, min: 1 })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-0">
                        {/* Number of Beds */}
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <input
                                type="number"
                                id="regularPrice"
                                placeholder="Regular Price / Month"
                                className={`w-full p-2 border rounded-md focus:outline-none ${errors?.regularPrice ? 'border-red-400' : 'border-gray-800'
                                    }`}
                                {...register("regularPrice", { required: true })}
                            />
                        </div>

                        {/* Number of Bathrooms */}
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <input
                                type="number"
                                id="discountPrice"
                                placeholder="Discount Price / Month"
                                className={`w-full p-2 border rounded-md focus:outline-none ${errors?.discountPrice ? 'border-red-400' : 'border-gray-800'
                                    }`}
                                {...register("discountPrice", { required: true })}
                            />
                        </div>
                    </div>

                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be cover (max 6)</span>
                    </p>
                    <div className="flex items-center gap-3">
                        {uploading && <FaSpinner className='mt-[1px] animate-spin' />}
                        <input onChange={handleImageChange} multiple type="file" name="imageUrls" id="imageUrls" accept='image/*' />
                    </div>
                    {/* <div>
                        <h3>Selected Images:</h3>
                        <ul>
                            {file?.map((image, index) => (
                                <li key={index}>{image.name}</li>
                            ))}
                        </ul>
                    </div> */}
                    <p className='text-red-400'>{imageError}</p>
                    <button disabled={isCreateListingLoading} type="submit" className='mt-3 w-96 py-1 rounded bg-green-600 text-white' value="">
                        <span className='flex items-center justify-center gap-2 my-auto'>
                            <span>Create Listing</span>
                            {isCreateListingLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                        </span>
                    </button>
                    {isCreateListingSuccess && <p className='text-green-600 text-center'>Listing Created!</p>}
                </div>
            </form>
        </main>
    )
}

export default CreateListing