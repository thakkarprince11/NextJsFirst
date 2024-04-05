'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // verifyUserEmail Method
    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', {
                token
            })
            //
        } catch (error: any) {
            console.log(error)
            setError(true)
        }
    }

    // useEffect
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail() // calling method
        }
    }, [token])

    // another useEffect
    useEffect(() => {
        const urlToken: any = window.location.search.split('=')[1]
        setToken(urlToken || "")
    }, [])

    // return
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token.length > 0 ? token : 'No Token'}
            </h2>

            {verified && (
                <div>
                    <h2 className="text-2xl bg-green-500 text-white">Email Verified</h2>
                    <Link href={'/login'}>Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-white">Error</h2>
                </div>
            )}
        </div>
    )
}
