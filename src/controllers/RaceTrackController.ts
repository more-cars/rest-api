import express from "express"
import {create} from "./race-tracks/create"
import {getById} from "./race-tracks/getById"

export class RaceTrackController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
