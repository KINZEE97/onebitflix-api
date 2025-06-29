import { Category } from "../models";


export const categoriesService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage;

        const { rows, count } = await Category.findAndCountAll({
            attributes: ["id", "name", "position"],
            order: [["position", "ASC"]],
            limit: perPage,
            offset
        });

        return ({
            categories: rows,
            page: page,
            perPage: perPage,
            count: count
        });
    },

    findByIdWithCourses: async (id: string) => {
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'courses',
                attributes: ['id', 'name', 'synopsis', ['thumbnail_url', "thumbnailUrl"]]
            }
        })

        return categoryWithCourses
    }



}