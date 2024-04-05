import { connect } from '@/db/dbConfig'

import { NextResponse, NextRequest } from 'next/server'

import User from '@/models/userModel'


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { token } = reqBody

        console.log(token, 'token')

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        //TODO: Can't find user

        console.log(user, 'user')

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid Token' },
                { status: 400 }
            )
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message : "User Verified"},{status : 200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
