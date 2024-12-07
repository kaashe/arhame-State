import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
const Oauth = () => {
    const googleClickHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log(result, 'res');

        } catch (error) {
            console.log('Could not sign in with google', error);

        }
    }
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