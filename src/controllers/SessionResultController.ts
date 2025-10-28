import express from "express"
import {create} from "./session-results/create"
import {getById} from "./session-results/getById"
import {getAll} from "./session-results/getAll"

export class SessionResultController {
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
