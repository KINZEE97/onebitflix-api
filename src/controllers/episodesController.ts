import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";


export const episodesController = {
    //GET /episodes/stream?videoUrl=

    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query;

        try {
            if (typeof videoUrl !== "string") throw new Error("videoUrl must be a string");
            const range = req.headers.range

            episodeService.streamEpisodeToResponse(res, videoUrl, range)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}