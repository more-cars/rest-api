import express from "express"
import {create} from "./programme-episodes/create"

export const ProgrammeEpisodeController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
