import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";


export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)
            if (userAlreadyExists) throw new Error("This email is already in use")

            const user = await userService.create({
                firstName,
                lastName,
                email,
                password,
                birth,
                phone,
                role: "user"
            })

            return res.status(201).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message })
            }
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await userService.findByEmail(email)
            if (!user) return res.status(404).json({ message: "User not found" })

            user.checkPassword(password, (err, isSame) => {
                if (err) return res.status(400).json({ message: err.message });
                if (!isSame) return res.status(401).json({ message: "Invalid password" });

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
                const token = jwtService.signToken(payload, '7d')


                return res.status(200).json({ authenticated: true, ...payload, token })


            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message })
            }

        }
    }
}