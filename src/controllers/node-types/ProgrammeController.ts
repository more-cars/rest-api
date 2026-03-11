import express from "express"
import {create} from "./programmes/create"

export const ProgrammeController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
