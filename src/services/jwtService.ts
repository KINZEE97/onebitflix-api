import jwt from 'jsonwebtoken'
import { JWT_KEY_SECRET } from '../config/enviroment'


export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string | number) => {
        return jwt.sign(payload, JWT_KEY_SECRET, {
            expiresIn: expiration
        })
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, JWT_KEY_SECRET, callbackfn)

    }
}