import express from "express"
import {create} from "./racing-games/create"

export const RacingGameController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
