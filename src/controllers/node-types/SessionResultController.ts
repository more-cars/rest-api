import express from "express"
import {create} from "./session-results/create"
import {getById} from "./session-results/getById"
import {getAll} from "./session-results/getAll"
import {deleteNode} from "./session-results/deleteNode"
import {createBelongsToRacingSessionRelation} from "./session-results/createBelongsToRacingSessionRelation"
import {getBelongsToRacingSessionRelation} from "./session-results/getBelongsToRacingSessionRelation"
import {deleteBelongsToRacingSessionRelation} from "./session-results/deleteBelongsToRacingSessionRelation"
import {createHasLapTimeRelation} from "./session-results/createHasLapTimeRelation"
import {getAllHasLapTimeRelations} from "./session-results/getAllHasLapTimeRelations"
import {deleteHasLapTimeRelation} from "./session-results/deleteHasLapTimeRelation"
import {createAchievedWithCarModelVariantRelation} from "./session-results/createAchievedWithCarModelVariantRelation"
import {getAchievedWithCarModelVariantRelation} from "./session-results/getAchievedWithCarModelVariantRelation"
import {deleteAchievedWithCarModelVariantRelation} from "./session-results/deleteAchievedWithCarModelVariantRelation"
import {createHasImageRelation} from "./session-results/createHasImageRelation"
import {getAllHasImageRelations} from "./session-results/getAllHasImageRelations"
import {deleteHasImageRelation} from "./session-results/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./session-results/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./session-results/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./session-results/deleteHasPrimeImageRelation"

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
