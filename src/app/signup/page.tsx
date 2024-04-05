'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignUpPage() {
    // router
    const router = useRouter()

    // user
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: ''
    })

    // buttonDisabled
    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    // isLoading
    const [isLoading, setIsLoading] = React.useState(false)

    // onSignUp
    const onSignup = async () => {
        try {
            setIsLoading(true)

            const response = await axios.post('/api/users/signup', user)

            console.log('SignUp Success', response?.data)

            toast.success("SignUp Success")


            setIsLoading(false)

            router.push("/login")
            //
        } catch (error: any) {
            console.log(error, 'SignUp Failed')
            toast.error(error.message)
            //
        } finally {
            setIsLoading(false)
        }
    }

    // useEffect
    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    // return
    return !isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign Up</h1>
            <hr />
            <label htmlFor="username" className="mt-4">
                Username :{' '}
            </label>
            <input
                id="username"
                type="text"
                placeholder="enter username"
                value={user.username}
                onChange={(val) =>
                    setUser({ ...user, username: val.target.value })
                }
                className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
            <label htmlFor="email" className="mt-4">
                Email :{' '}
            </label>
            <input
                id="email"
                type="text"
                placeholder="enter email"
                value={user.email}
                onChange={(val) =>
                    setUser({ ...user, email: val.target.value })
                }
                className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
            <label htmlFor="password" className="mt-4">
                Password :{' '}
            </label>
            <input
                id="password"
                type="password"
                placeholder="enter password"
                value={user.password}
                onChange={(val) =>
                    setUser({ ...user, password: val.target.value })
                }
                className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
                disabled={buttonDisabled ? true : false}
            >
                Sign Up
            </button>

            <Link href={'/login'}>Already have an Account? Login</Link>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Loading...</h1>
        </div>
    )
}
