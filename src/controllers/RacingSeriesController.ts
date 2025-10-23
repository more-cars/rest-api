import express from "express"
import {create} from "./racing-series/create"
import {getById} from "./racing-series/getById"
import {getAll} from "./racing-series/getAll"
import {deleteNode} from "./racing-series/deleteNode"
import {createHasRacingEventRelation} from "./racing-series/createHasRacingEventRelation"

export class RacingSeriesController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }

    static async createHasRacingEventRelation(req: express.Request, res: express.Response) {
        await createHasRacingEventRelation(req, res)
    }
}
