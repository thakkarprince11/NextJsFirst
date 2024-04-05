import { getTokenData } from '@/helpers/getTokenData' //Importing from Helper
import { NextResponse, NextRequest } from 'next/server'

import User from '@/models/userModel' // Importing User from models
import { connect } from '@/db/dbConfig' // Importing from db

connect() // connect

export async function GET(request: NextRequest) {
    try {
        const token = await getTokenData(request) // calling Method

        const userId = token.id

        const user = await User.findById(userId).select('-password')

        return NextResponse.json({message : "User Found", data : user}, {status : 200})
        //
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
