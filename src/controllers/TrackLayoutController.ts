import express from "express"
import {create} from "./track-layouts/create"
import {getById} from "./track-layouts/getById"

export class TrackLayoutController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
