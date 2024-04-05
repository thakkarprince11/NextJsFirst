'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Profile() {

    const router = useRouter()      // router

    const [user, setUser] : any = useState('')

    // logout
    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout')

            console.log(response)
            toast.success('Logout Successfull')

            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    // getUserDetsil
    const getUserDetails = async() =>{
        const res = await axios.get('/api/users/fetchTokenData')

        console.log(res?.data?.data?.username)

        setUser(res?.data?.data)

        router.push(`/profile/${res?.data?.data?.username}`)
    }


    // return
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>

            <button
                onClick={getUserDetails}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white mt-8"
            >
                Profile Details
            </button>


            <button
                onClick={logout}
                className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-white mt-8"
            >
                Logout
            </button>
        </div>
    )
}
