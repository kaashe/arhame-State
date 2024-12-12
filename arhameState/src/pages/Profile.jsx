import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Profile = () => {
    const fileRef = useRef();
    const currentuser = useSelector((state) => state?.user?.currentuser)
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            // const response = await SignIn(data).unwrap();
            // console.log("Success:", response);
            // dispatch(signInSuccess(response))
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        reset({ username: currentuser?.user, ...currentuser })
    }, [reset]);

    return (
        <div className='px-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7' >Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-2'>
                <input hidden ref={fileRef} type="file" name="" id="" accept='image/*' />
                <img
                    onClick={() => fileRef.current.click()}
                    alt=""
                    src={currentuser?.photoURL || "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    className="cursor-pointer self-center my-2 object-cover size-20 rounded-full ring-2 ring-black"
                />
                <input type="text" id='username' className={`border p-3 rounded-lg ${errors?.username ? 'border-red-400' : ""}`} placeholder="Username" {...register("username", { required: true, maxLength: 20 })} />
                <input type="email" id='email' className={`border p-3 rounded-lg ${errors?.email ? 'border-red-400' : ""}`} placeholder="Email" {...register("email", { required: true, maxLength: 20 })} />
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