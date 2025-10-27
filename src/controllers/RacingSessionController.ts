import express from "express"
import {create} from "./racing-sessions/create"
import {getById} from "./racing-sessions/getById"
import {getAll} from "./racing-sessions/getAll"
import {deleteNode} from "./racing-sessions/deleteNode"
import {createBelongsToRacingEventRelation} from "./racing-sessions/createBelongsToRacingEventRelation"
import {getBelongsToRacingEventRelation} from "./racing-sessions/getBelongsToRacingEventRelation"
import {deleteBelongsToRacingEventRelation} from "./racing-sessions/deleteBelongsToRacingEventRelation"
import {createHasImageRelation} from "./racing-sessions/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-sessions/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-sessions/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-sessions/createHasPrimeImageRelation"

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

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    }

    static async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }
}
