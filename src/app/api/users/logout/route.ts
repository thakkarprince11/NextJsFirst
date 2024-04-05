import { connect } from '@/db/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import toast from 'react-hot-toast'



export async function GET() {
    try {
        const response = NextResponse.json(
            { message: 'Logout Successfull' },
            { status: 200 }
        )

        response.cookies.set('token', '', { httpOnly: true, expires : new Date(0) })


        return response

        //
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
