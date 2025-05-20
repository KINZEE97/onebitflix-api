import jwt, { Secret } from 'jsonwebtoken'

const secret: Secret = 'your_jwt_secret'

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string | number) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiration
        })
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn)

    }
}