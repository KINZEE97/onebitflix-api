import { Request, Response } from "express";
import { categoriesService } from "../services/categoriesService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        const [page, pageNumber] = getPaginationParams(req.query)


        try {
            const paginatedCategories = await categoriesService.findAllPaginated(page, pageNumber)
            return res.json(paginatedCategories)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    },
};
