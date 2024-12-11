import React, { useEffect } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useGoogleMutation } from '../store/api/authSlice'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Oauth = () => {
    const [google, { isLoading, isError, error, isSuccess, reset: resetMutationState }] = useGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const googleClickHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log(result?.user, 'res');
            await google({
                user: result?.user.displayName,
                email: result?.user.email,
                photoURL: result?.user.photoURL
            })
            dispatch(signInSuccess({
                user: result?.user.displayName,
                email: result?.user.email,
                photoURL: result?.user.photoURL
            }))
        } catch (error) {
            console.log('Could not sign in with google', error);
        }
    }
    useEffect(() => {
        let timeout;
        if (isSuccess) {
            timeout = setTimeout(() => {
                navigate('/')
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [isSuccess]);
    return (
        <button onClick={googleClickHandler} className=' bg-[#4285F4] text-white p-2 rounded-md disabled:opacity-40 hover:opacity-90' type="button">
            <span className='flex items-center justify-center gap-2 my-auto'>
                {<FaGoogle className='mt-[1px]' />}
                <span>Continue With Google</span>
            </span>
        </button>
    )
}
export default Oauth