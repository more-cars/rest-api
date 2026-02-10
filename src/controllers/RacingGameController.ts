import express from "express"
import {create} from "./racing-games/create"
import {getById} from "./racing-games/getById"

export const RacingGameController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
