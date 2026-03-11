import express from "express"
import {create} from "./programme-episodes/create"
import {getById} from "./programme-episodes/getById"

export const ProgrammeEpisodeController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
