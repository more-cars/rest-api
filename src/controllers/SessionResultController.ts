import express from "express"
import {create} from "./session-results/create"
import {getById} from "./session-results/getById"
import {getAll} from "./session-results/getAll"
import {deleteNode} from "./session-results/deleteNode"
import {createBelongsToRacingSessionRelation} from "./session-results/createBelongsToRacingSessionRelation"
import {getBelongsToRacingSessionRelation} from "./session-results/getBelongsToRacingSessionRelation"

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
}
