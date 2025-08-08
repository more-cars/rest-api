import express from "express"
import {create} from "./images/create"
import {getById} from "./images/getById"
import {getAll} from "./images/getAll"
import {createBelongsToNodeRelation} from "./images/createBelongsToNodeRelation"
import {getBelongsToNodeRelation} from "./images/getBelongsToNodeRelation"
import {getBelongsToNodeRelations} from "./images/getBelongsToNodeRelations"
import {getBelongsToNodeTypeRelations} from "./images/getBelongsToNodeTypeRelations"

export class ImageController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }

    static async createBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await createBelongsToNodeRelation(req, res)
    }

    static async getBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await getBelongsToNodeRelation(req, res)
    }

    static async getBelongsToNodeRelations(req: express.Request, res: express.Response) {
        await getBelongsToNodeRelations(req, res)
    }

    static async getBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
        await getBelongsToNodeTypeRelations(req, res)
    }
}
