import { Favorite } from "../models"

export const favoriteService = {
    create: async (userId: number, courseId: number) => {
        const favorite = await Favorite.create({
            courseId,
            userId
        })

        return favorite
    }

}