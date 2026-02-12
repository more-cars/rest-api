import express from "express"
import {create} from "./gaming-platforms/create"

export const GamingPlatformController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
