import nodemailer from 'nodemailer' // importing nodemailer

import User from '@/models/userModel' // Importing User from models

import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                { new: true }
            )
        } else if (emailType === 'FORGOTPASSWORD') {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
                { new: true }
            )
        }

        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        })

        const mailOptions = {
            from: 'testNextapp@email.com',
            to: email,
            subject:
                emailType === 'VERIFY'
                    ? 'Verify your email'
                    : 'Reset your password',
            html: `<p> Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === 'VERIFY' ? 'Verify Email' : 'Reset your password'
            }</p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions)

        return mailresponse

        //
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
