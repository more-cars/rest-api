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
import {createHasImageRelation} from "./car-model-variants/createHasImageRelation"
import {getAllHasImageRelations} from "./car-model-variants/getAllHasImageRelations"
import {deleteHasImageRelation} from "./car-model-variants/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./car-model-variants/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./car-model-variants/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./car-model-variants/deleteHasPrimeImageRelation"
import {createIsFeaturedInRacingGameRelation} from "./car-model-variants/createIsFeaturedInRacingGameRelation"

export const CarModelVariantController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },

    async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    },

    async createIsVariantOfRelation(req: express.Request, res: express.Response) {
        await createIsVariantOfRelation(req, res)
    },

    async getIsVariantOfRelation(req: express.Request, res: express.Response) {
        await getIsVariantOfRelation(req, res)
    },

    async deleteIsVariantOfRelation(req: express.Request, res: express.Response) {
        await deleteIsVariantOfRelation(req, res)
    },

    async createAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await createAchievedSessionResultRelation(req, res)
    },

    async getAllAchievedSessionResultRelations(req: express.Request, res: express.Response) {
        await getAllAchievedSessionResultRelations(req, res)
    },

    async deleteAchievedSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteAchievedSessionResultRelation(req, res)
    },

    async createAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await createAchievedLapTimeRelation(req, res)
    },

    async getAllAchievedLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllAchievedLapTimeRelations(req, res)
    },

    async deleteAchievedLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteAchievedLapTimeRelation(req, res)
    },

    async createIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await createIsFeaturedInRacingGameRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },

    async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    },

    async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    },

    async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    },

    async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    },
}
