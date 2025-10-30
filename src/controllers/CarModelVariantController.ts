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
import {createAchievedLapTimeRelation} from "./car-model-variants/createAchievedLapTimeRelation"
import {getAllAchievedLapTimeRelations} from "./car-model-variants/getAllAchievedLapTimeRelations"
import {deleteAchievedLapTimeRelation} from "./car-model-variants/deleteAchievedLapTimeRelation"

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

    static async createAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await createAchievedLapTimeRelation(req, res)
    }

    static async getAllAchievedLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllAchievedLapTimeRelations(req, res)
    }

    static async deleteAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteAchievedLapTimeRelation(req, res)
    }
}
