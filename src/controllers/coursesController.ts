import { Request, Response } from "express";
import { coursesService } from "../services/coursesService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

export const coursesController = {

    // GET /courses/featured
    featured: async (req: Request, res: Response) => {

        try {
            const featuredCourses = await coursesService.getRandomFeaturedCourses();
            return res.json(featuredCourses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //GET /courses/newest
    newest: async (req: Request, res: Response) => {

        try {
            const newestCourses = await coursesService.getTopTenNewest();
            return res.json(newestCourses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //GET /courses/popular
    popular: async (req: Request, res: Response) => {
        try {
            const topTen = await coursesService.getTopTenByLikes();
            return res.json(topTen)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    //GET /courses/search 
    search: async (req: Request, res: Response) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if (typeof name !== 'string') throw new Error("Name must be the type of string")
            const courses = await coursesService.findByName(name, page, perPage);
            return res.json(courses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //GET /courses/:id
    show: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const courseId = req.params.id;


        try {
            const course = await coursesService.findByIdWithEpisodes(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            const liked = await likeService.isLiked(userId, +courseId)
            const favorited = await favoriteService.isFavorited(userId, +courseId)
            return res.json({ ...course.get(), liked, favorited })

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },


};
