import express from "express"
import {create} from "./magazines/create"
import {getById} from "./magazines/getById"

export const MagazineController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
