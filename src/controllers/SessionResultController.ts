import express from "express"
import {create} from "./session-results/create"

export class SessionResultController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
