import { Request, Response } from "express";
import { coursesService } from "../services/coursesService";

export const coursesController = {
    //GET /courses/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const course = await coursesService.findByIdWithEpisodes(id);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            return res.json(course);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
};
