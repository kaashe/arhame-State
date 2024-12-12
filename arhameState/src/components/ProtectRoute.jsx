import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
    const currentuser = useSelector((state) => state?.user?.currentuser)
    return (currentuser ? <Outlet /> : <Navigate to={'/sign-in'} />)
}

export default ProtectRoute