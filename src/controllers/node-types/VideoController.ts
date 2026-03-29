import express from "express"
import {create} from "./videos/create"

export const VideoController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
