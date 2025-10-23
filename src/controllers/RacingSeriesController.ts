import express from "express"
import {create} from "./racing-series/create"
import {getById} from "./racing-series/getById"
import {getAll} from "./racing-series/getAll"
import {deleteNode} from "./racing-series/deleteNode"
import {createHasRacingEventRelation} from "./racing-series/createHasRacingEventRelation"
import {getAllHasRacingEventRelations} from "./racing-series/getAllHasRacingEventRelations"
import {deleteHasRacingEventRelation} from "./racing-series/deleteHasRacingEventRelation"
import {createHasImageRelation} from "./racing-series/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-series/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-series/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-series/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./racing-series/getHasPrimeImageRelation"

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

    static async getAllHasRacingEventRelations(req: express.Request, res: express.Response) {
        await getAllHasRacingEventRelations(req, res)
    }

    static async deleteHasRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteHasRacingEventRelation(req, res)
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
