import express from "express"
import {create} from "./programmes/create"
import {getById} from "./programmes/getById"

export const ProgrammeController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
