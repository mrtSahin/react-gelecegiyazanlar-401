import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoutes() {

    const { loggedIn } = useAuth()

    return (
        loggedIn ? <Outlet/> : <Navigate to={{pathname:'/'}}/> // Outlet ile elemanlari basiyoruz.
    )
}

export default ProtectedRoutes