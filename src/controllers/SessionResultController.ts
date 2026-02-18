import express from "express"
import {create} from "./node-types/session-results/create"
import {getById} from "./node-types/session-results/getById"
import {getAll} from "./node-types/session-results/getAll"
import {deleteNode} from "./node-types/session-results/deleteNode"
import {createBelongsToRacingSessionRelation} from "./node-types/session-results/createBelongsToRacingSessionRelation"
import {getBelongsToRacingSessionRelation} from "./node-types/session-results/getBelongsToRacingSessionRelation"
import {deleteBelongsToRacingSessionRelation} from "./node-types/session-results/deleteBelongsToRacingSessionRelation"
import {createHasLapTimeRelation} from "./node-types/session-results/createHasLapTimeRelation"
import {getAllHasLapTimeRelations} from "./node-types/session-results/getAllHasLapTimeRelations"
import {deleteHasLapTimeRelation} from "./node-types/session-results/deleteHasLapTimeRelation"
import {createAchievedWithCarModelVariantRelation} from "./node-types/session-results/createAchievedWithCarModelVariantRelation"
import {getAchievedWithCarModelVariantRelation} from "./node-types/session-results/getAchievedWithCarModelVariantRelation"
import {deleteAchievedWithCarModelVariantRelation} from "./node-types/session-results/deleteAchievedWithCarModelVariantRelation"
import {createHasImageRelation} from "./node-types/session-results/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/session-results/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/session-results/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/session-results/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/session-results/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/session-results/deleteHasPrimeImageRelation"

export const SessionResultController = {
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

    async createBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingSessionRelation(req, res)
    },

    async getBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingSessionRelation(req, res)
    },

    async deleteBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingSessionRelation(req, res)
    },

    async createHasLapTimeRelation(req: express.Request, res: express.Response) {
        await createHasLapTimeRelation(req, res)
    },

    async getAllHasLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllHasLapTimeRelations(req, res)
    },

    async deleteHasLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteHasLapTimeRelation(req, res)
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
