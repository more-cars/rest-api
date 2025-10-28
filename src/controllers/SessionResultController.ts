import express from "express"
import {create} from "./session-results/create"
import {getById} from "./session-results/getById"

export class SessionResultController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
