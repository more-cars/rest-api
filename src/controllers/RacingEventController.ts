import express from "express"
import {create} from "./racing-events/create"
import {getById} from "./racing-events/getById"
import {getAll} from "./racing-events/getAll"

export class RacingEventController {
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
