import express from "express"
import {create} from "./race-tracks/create"

export class RaceTrackController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
