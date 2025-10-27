import express from "express"
import {create} from "./racing-sessions/create"

export class RacingSessionController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
