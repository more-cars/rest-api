import express from "express"
import {create} from "./videos/create"
import {getById} from "./videos/getById"

export const VideoController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
