import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
    //GET /users/current

    show: async (req: AuthenticatedRequest, res: Response) => {
        const currentUser = req.user!;

        try {
            return res.json(currentUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    },
    //PUT /users/current
    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!;
        const { firstName, lastName, phone, email, birth } = req.body;

        try {
            const updatedUser = await userService.update(id, {
                firstName,
                lastName,
                phone,
                email,
                birth,
            });

            return res.json(updatedUser);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },

    //PUT /users/current/password

    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user!;
        const { currentPassword, newPassword } = req.body;

        user.checkPassword(currentPassword, async (error, isSame) => {
            try {
                if (error)
                    return res.status(400).json({ message: error.message });
                if (!isSame)
                    return res
                        .status(400)
                        .json({ message: "uncorrect password" });

                await userService.updatePassword(user.id, newPassword);
                return res.status(204).send();
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message });
                }
            }
        });
    },

    //GET /users/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!;

        try {
            const watching = await userService.getKeepWatchingList(id);
            res.json(watching);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    },
};
