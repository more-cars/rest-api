import express from "express"
import {create} from "./car-model-variants/create"
import {getById} from "./car-model-variants/getById"
import {getAll} from "./car-model-variants/getAll"
import {deleteNode} from "./car-model-variants/deleteNode"
import {createIsVariantOfRelation} from "./car-model-variants/createIsVariantOfRelation"

export class CarModelVariantController {
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

    static async createIsVariantOfRelation(req: express.Request, res: express.Response) {
        await createIsVariantOfRelation(req, res)
    }
}
