import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {

    //GET /users/current 

    show: async (req: AuthenticatedRequest, res: Response) => {
        const currentUser = req.user!

        try {
            return res.json(currentUser)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
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
