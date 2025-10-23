import express from "express"
import {create} from "./track-layouts/create"
import {getById} from "./track-layouts/getById"
import {getAll} from "./track-layouts/getAll"
import {deleteNode} from "./track-layouts/deleteNode"
import {createBelongsToRaceTrackRelation} from "./track-layouts/createBelongsToRaceTrackRelation"
import {getBelongsToRaceTrackRelation} from "./track-layouts/getBelongsToRaceTrackRelation"
import {deleteBelongsToRaceTrackRelation} from "./track-layouts/deleteBelongsToRaceTrackRelation"
import {createWasUsedByRacingEventRelation} from "./track-layouts/createWasUsedByRacingEventRelation"
import {createHasImageRelation} from "./track-layouts/createHasImageRelation"
import {getAllHasImageRelations} from "./track-layouts/getAllHasImageRelations"
import {deleteHasImageRelation} from "./track-layouts/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./track-layouts/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./track-layouts/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./track-layouts/deleteHasPrimeImageRelation"

export class TrackLayoutController {
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

    static async createBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await createBelongsToRaceTrackRelation(req, res)
    }

    static async getBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await getBelongsToRaceTrackRelation(req, res)
    }

    static async deleteBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRaceTrackRelation(req, res)
    }

    static async createWasUsedByRacingEventRelation(req: express.Request, res: express.Response) {
        await createWasUsedByRacingEventRelation(req, res)
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

    static async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    }
}
