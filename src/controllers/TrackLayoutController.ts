import express from "express"
import {create} from "./track-layouts/create"
import {getById} from "./track-layouts/getById"
import {getAll} from "./track-layouts/getAll"
import {deleteNode} from "./track-layouts/deleteNode"
import {createBelongsToRaceTrackRelation} from "./track-layouts/createBelongsToRaceTrackRelation"
import {getBelongsToRaceTrackRelation} from "./track-layouts/getBelongsToRaceTrackRelation"
import {deleteBelongsToRaceTrackRelation} from "./track-layouts/deleteBelongsToRaceTrackRelation"

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
}
