import express from "express"
import {create} from "./gaming-platforms/create"
import {getById} from "./gaming-platforms/getById"
import {getAll} from "./gaming-platforms/getAll"

export const GamingPlatformController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },
}
