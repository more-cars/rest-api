import express from "express"
import {create} from "./node-types/gaming-platforms/create"
import {getById} from "./node-types/gaming-platforms/getById"
import {getAll} from "./node-types/gaming-platforms/getAll"
import {deleteNode} from "./node-types/gaming-platforms/deleteNode"
import {createFeaturesRacingGameRelation} from "./node-types/gaming-platforms/createFeaturesRacingGameRelation"
import {getAllFeaturesRacingGameRelations} from "./node-types/gaming-platforms/getAllFeaturesRacingGameRelations"
import {deleteFeaturesRacingGameRelation} from "./node-types/gaming-platforms/deleteFeaturesRacingGameRelation"
import {createHasImageRelation} from "./node-types/gaming-platforms/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/gaming-platforms/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/gaming-platforms/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/gaming-platforms/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/gaming-platforms/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/gaming-platforms/deleteHasPrimeImageRelation"

export const GamingPlatformController = {
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

    async createFeaturesRacingGameRelation(req: express.Request, res: express.Response) {
        await createFeaturesRacingGameRelation(req, res)
    },

    async getAllFeaturesRacingGameRelations(req: express.Request, res: express.Response) {
        await getAllFeaturesRacingGameRelations(req, res)
    },

    async deleteFeaturesRacingGameRelation(req: express.Request, res: express.Response) {
        await deleteFeaturesRacingGameRelation(req, res)
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
