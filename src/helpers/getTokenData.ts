import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const getTokenData = async(request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || ''

        const decodedToken : any = await jwt.verify(encodedToken, process.env.TOKEN_SECRET)

        console.log(decodedToken, "decodedToken")

        return decodedToken

    } catch (error: any) {
        throw new Error(error.message)
    }
}
 