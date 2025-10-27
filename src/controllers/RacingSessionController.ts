import express from "express"
import {create} from "./racing-sessions/create"
import {getById} from "./racing-sessions/getById"
import {getAll} from "./racing-sessions/getAll"

export class RacingSessionController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }
}
