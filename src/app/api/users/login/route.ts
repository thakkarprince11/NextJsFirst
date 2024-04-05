import { connect } from '@/db/dbConfig'
import User from '@/models/userModel.js'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()       // connect

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { username, password } = reqBody

        console.log(reqBody)

        // Check if user exists
        const user = await User.findOne({ username })

        if (!user) {
            return NextResponse.json(
                { error: 'User doesnt Exists' },
                { status: 401 }
            )
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid Password' },
                { status: 400 }
            )
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '1d'
        })

        const response = NextResponse.json(
            { message: 'Login Successfull', success: true },
            { status: 200 }
        )

        response.cookies.set('token', token , {httpOnly : true, secure : true})

        return response

        //
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
