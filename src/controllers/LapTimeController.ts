import express from "express"
import {create} from "./lap-times/create"

export class LapTimeController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
