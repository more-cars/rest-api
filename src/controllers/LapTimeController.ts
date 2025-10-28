import express from "express"
import {create} from "./lap-times/create"
import {getById} from "./lap-times/getById"

export class LapTimeController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
