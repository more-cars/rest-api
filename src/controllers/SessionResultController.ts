import express from "express"
import {create} from "./session-results/create"
import {getById} from "./session-results/getById"
import {getAll} from "./session-results/getAll"
import {deleteNode} from "./session-results/deleteNode"
import {createBelongsToRacingSessionRelation} from "./session-results/createBelongsToRacingSessionRelation"
import {getBelongsToRacingSessionRelation} from "./session-results/getBelongsToRacingSessionRelation"
import {deleteBelongsToRacingSessionRelation} from "./session-results/deleteBelongsToRacingSessionRelation"
import {createHasLapTimeRelation} from "./session-results/createHasLapTimeRelation"
import {getAllHasLapTimeRelations} from "./session-results/getAllHasLapTimeRelations"
import {deleteHasLapTimeRelation} from "./session-results/deleteHasLapTimeRelation"
import {createHasImageRelation} from "./session-results/createHasImageRelation"
import {getAllHasImageRelations} from "./session-results/getAllHasImageRelations"
import {deleteHasImageRelation} from "./session-results/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./session-results/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./session-results/getHasPrimeImageRelation"

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

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }

    static async createBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingSessionRelation(req, res)
    }

    static async getBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingSessionRelation(req, res)
    }

    static async deleteBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingSessionRelation(req, res)
    }

    static async createHasLapTimeRelation(req: express.Request, res: express.Response) {
        await createHasLapTimeRelation(req, res)
    }

    static async getAllHasLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllHasLapTimeRelations(req, res)
    }

    static async deleteHasLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteHasLapTimeRelation(req, res)
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

    static async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    }
}
