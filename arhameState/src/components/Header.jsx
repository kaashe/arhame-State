import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { VscSignOut } from "react-icons/vsc";

const Header = () => {
    const currentuser = useSelector((state) => state?.user?.currentuser)
    console.log('current user', currentuser);
    return (
        <header className='bg-[#e9e9ed] shadow-sm'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
                        <span className="text-[#F9826C]">Arham</span>
                        <span className="text-slate-700">Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-2 rounded-lg flex justify-between items-center'>
                    <input className='bg-transparent focus:outline-none w-24 sm:w-60' type="text" placeholder='Search...' name="" id="" />
                    <FaSearch className='text-slate-500' />
                </form>
                <ul className='flex items-center gap-3'>
                    <Link to={'/'}>  <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>  </Link>
                    <Link to={'/about'}> <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
                    {currentuser ? (
                        <Link to={'/profile'}>
                            <img
                                alt=""
                                src={currentuser?.avatar || currentuser?.photoURL}
                                className="inline-block size-10 rounded-full ring-2 ring-white"
                            />
                        </Link>
                    ) : (
                        <Link to={'/sign-in'}>
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Header