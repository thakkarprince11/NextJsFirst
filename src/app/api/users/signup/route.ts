import { connect } from '@/db/dbConfig'
import User from '@/models/userModel.js'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailtrap'

connect() // connect

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { username, email, password } = reqBody

        console.log(reqBody)

        // Check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json(
                { error: 'User Already Exists' },
                { status: 400 }
            )
        }

        // hash password

        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email
        })

        const savedUser = await newUser.save()

        console.log(savedUser)

        // Send Verification email

        await sendEmail({email : email,emailType : "VERIFY",  userId : savedUser._id})

        return NextResponse.json(
            { message: 'User created successfully', success: true, savedUser },
            { status: 200 }
        )
        //
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
