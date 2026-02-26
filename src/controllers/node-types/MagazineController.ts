import express from "express"
import {create} from "./magazines/create"

export const MagazineController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
