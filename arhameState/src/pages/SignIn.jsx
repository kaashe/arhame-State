import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../store/api/authSlice';
import { FaSpinner } from "react-icons/fa";
const SignIn = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [SignIn, { isLoading, isError, error, isSuccess, reset: resetMutationState }] = useSignInMutation();
    const onSubmit = async (data) => {
        try {
            const response = await SignIn(data).unwrap();
            console.log("Success:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        let timeout;
        if (isSuccess) {
            reset();
            timeout = setTimeout(() => {
                navigate('/')
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [isSuccess, reset, resetMutationState]);

    return (
        <div className='px-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7' >Sign in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-2'>
                <input type="text" id='username' className={`border p-3 rounded-lg ${errors?.username ? 'border-red-400' : ""}`} placeholder="Username" {...register("username", { required: true, maxLength: 20 })} />
                <input type="password" id='password' className={`border p-3 rounded-lg ${errors?.password ? 'border-red-400' : ""}`} placeholder="Password" {...register("password", { required: 'Password is required', maxLength: 8 })} />
                <button disabled={isLoading} className='bg-[#F9826C] text-white p-2 rounded-md uppercase disabled:opacity-40 hover:opacity-90' type="submit">
                    <span className='flex items-center justify-center gap-2 my-auto'>
                        <span>SUBMIT</span>
                        {isLoading && <FaSpinner className='mt-[1px] animate-spin' />}
                    </span>
                </button>
            </form>
            {isError && <p className='text-red-400 text-center'>{error.data.error || 'Something went wrong'}</p>}
            {isSuccess && <p className='text-green-600 text-center'>User logged in!</p>}
            <div className='flex gap-2 mt-2'>
                <p>Don't have an Account?</p>
                <Link className='text-blue-500' to={'/sign-up'}>Sign Up</Link>
            </div>
        </div>
    )
}

export default SignIn