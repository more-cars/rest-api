import express from "express"
import {create} from "./car-model-variants/create"
import {getById} from "./car-model-variants/getById"
import {getAll} from "./car-model-variants/getAll"
import {deleteNode} from "./car-model-variants/deleteNode"
import {createIsVariantOfRelation} from "./car-model-variants/createIsVariantOfRelation"
import {getIsVariantOfRelation} from "./car-model-variants/getIsVariantOfRelation"
import {deleteIsVariantOfRelation} from "./car-model-variants/deleteIsVariantOfRelation"
import {createAchievedSessionResultRelation} from "./car-model-variants/createAchievedSessionResultRelation"
import {getAllAchievedSessionResultRelations} from "./car-model-variants/getAllAchievedSessionResultRelations"
import {deleteAchievedSessionResultRelation} from "./car-model-variants/deleteAchievedSessionResultRelation"

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

    static async getIsVariantOfRelation(req: express.Request, res: express.Response) {
        await getIsVariantOfRelation(req, res)
    }

    static async deleteIsVariantOfRelation(req: express.Request, res: express.Response) {
        await deleteIsVariantOfRelation(req, res)
    }

    static async createAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await createAchievedSessionResultRelation(req, res)
    }

    static async getAllAchievedSessionResultRelations(req: express.Request, res: express.Response) {
        await getAllAchievedSessionResultRelations(req, res)
    }

    static async deleteAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteAchievedSessionResultRelation(req, res)
    }
}
