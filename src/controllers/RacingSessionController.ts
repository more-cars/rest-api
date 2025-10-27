import express from "express"
import {create} from "./racing-sessions/create"
import {getById} from "./racing-sessions/getById"
import {getAll} from "./racing-sessions/getAll"
import {deleteNode} from "./racing-sessions/deleteNode"
import {createBelongsToRacingEventRelation} from "./racing-sessions/createBelongsToRacingEventRelation"
import {getBelongsToRacingEventRelation} from "./racing-sessions/getBelongsToRacingEventRelation"
import {deleteBelongsToRacingEventRelation} from "./racing-sessions/deleteBelongsToRacingEventRelation"

export class RacingSessionController {
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

    static async createBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingEventRelation(req, res)
    }

    static async getBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingEventRelation(req, res)
    }

    static async deleteBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingEventRelation(req, res)
    }
}
