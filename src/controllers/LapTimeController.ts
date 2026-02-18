import express from "express"
import {create} from "./node-types/lap-times/create"
import {getById} from "./node-types/lap-times/getById"
import {getAll} from "./node-types/lap-times/getAll"
import {deleteNode} from "./node-types/lap-times/deleteNode"
import {createBelongsToSessionResultRelation} from "./node-types/lap-times/createBelongsToSessionResultRelation"
import {getBelongsToSessionResultRelation} from "./node-types/lap-times/getBelongsToSessionResultRelation"
import {deleteBelongsToSessionResultRelation} from "./node-types/lap-times/deleteBelongsToSessionResultRelation"
import {createAchievedOnTrackLayoutRelation} from "./node-types/lap-times/createAchievedOnTrackLayoutRelation"
import {getAchievedOnTrackLayoutRelation} from "./node-types/lap-times/getAchievedOnTrackLayoutRelation"
import {deleteAchievedOnTrackLayoutRelation} from "./node-types/lap-times/deleteAchievedOnTrackLayoutRelation"
import {createAchievedWithCarModelVariantRelation} from "./node-types/lap-times/createAchievedWithCarModelVariantRelation"
import {getAchievedWithCarModelVariantRelation} from "./node-types/lap-times/getAchievedWithCarModelVariantRelation"
import {deleteAchievedWithCarModelVariantRelation} from "./node-types/lap-times/deleteAchievedWithCarModelVariantRelation"
import {createHasImageRelation} from "./node-types/lap-times/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/lap-times/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/lap-times/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/lap-times/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/lap-times/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/lap-times/deleteHasPrimeImageRelation"

export const LapTimeController = {
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

    async createBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await createBelongsToSessionResultRelation(req, res)
    },

    async getBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await getBelongsToSessionResultRelation(req, res)
    },

    async deleteBelongsToSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToSessionResultRelation(req, res)
    },

    async createAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await createAchievedOnTrackLayoutRelation(req, res)
    },

    async getAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await getAchievedOnTrackLayoutRelation(req, res)
    },

    async deleteAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
        await deleteAchievedOnTrackLayoutRelation(req, res)
    },

    async createAchievedWithCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createAchievedWithCarModelVariantRelation(req, res)
    },

    async getAchievedWithCarModelVariantRelation(req: express.Request, res: express.Response) {
        await getAchievedWithCarModelVariantRelation(req, res)
    },

    async deleteAchievedWithCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deleteAchievedWithCarModelVariantRelation(req, res)
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
