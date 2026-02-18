import express from "express"
import {create} from "./node-types/car-model-variants/create"
import {getById} from "./node-types/car-model-variants/getById"
import {getAll} from "./node-types/car-model-variants/getAll"
import {deleteNode} from "./node-types/car-model-variants/deleteNode"
import {createIsVariantOfRelation} from "./node-types/car-model-variants/createIsVariantOfRelation"
import {getIsVariantOfRelation} from "./node-types/car-model-variants/getIsVariantOfRelation"
import {deleteIsVariantOfRelation} from "./node-types/car-model-variants/deleteIsVariantOfRelation"
import {createAchievedSessionResultRelation} from "./node-types/car-model-variants/createAchievedSessionResultRelation"
import {getAllAchievedSessionResultRelations} from "./node-types/car-model-variants/getAllAchievedSessionResultRelations"
import {deleteAchievedSessionResultRelation} from "./node-types/car-model-variants/deleteAchievedSessionResultRelation"
import {createAchievedLapTimeRelation} from "./node-types/car-model-variants/createAchievedLapTimeRelation"
import {getAllAchievedLapTimeRelations} from "./node-types/car-model-variants/getAllAchievedLapTimeRelations"
import {deleteAchievedLapTimeRelation} from "./node-types/car-model-variants/deleteAchievedLapTimeRelation"
import {createIsFeaturedInRacingGameRelation} from "./node-types/car-model-variants/createIsFeaturedInRacingGameRelation"
import {getAllIsFeaturedInRacingGameRelations} from "./node-types/car-model-variants/getAllIsFeaturedInRacingGameRelations"
import {deleteIsFeaturedInRacingGameRelation} from "./node-types/car-model-variants/deleteIsFeaturedInRacingGameRelation"
import {createHasImageRelation} from "./node-types/car-model-variants/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/car-model-variants/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/car-model-variants/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/car-model-variants/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/car-model-variants/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/car-model-variants/deleteHasPrimeImageRelation"

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

    async getAllIsFeaturedInRacingGameRelations(req: express.Request, res: express.Response) {
        await getAllIsFeaturedInRacingGameRelations(req, res)
    },

    async deleteIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await deleteIsFeaturedInRacingGameRelation(req, res)
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
