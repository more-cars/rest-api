import express from "express"
import {create} from "./lap-times/create"
import {getById} from "./lap-times/getById"
import {getAll} from "./lap-times/getAll"
import {deleteNode} from "./lap-times/deleteNode"
import {createBelongsToSessionResultRelation} from "./lap-times/createBelongsToSessionResultRelation"
import {getBelongsToSessionResultRelation} from "./lap-times/getBelongsToSessionResultRelation"

export class LapTimeController {
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

    static async createBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await createBelongsToSessionResultRelation(req, res)
    }

    static async getBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await getBelongsToSessionResultRelation(req, res)
    }
}
