import express from "express"
import {create} from "./lap-times/create"
import {getById} from "./lap-times/getById"
import {getAll} from "./lap-times/getAll"

export class LapTimeController {
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
