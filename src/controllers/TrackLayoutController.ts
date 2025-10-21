import express from "express"
import {create} from "./track-layouts/create"

export class TrackLayoutController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
