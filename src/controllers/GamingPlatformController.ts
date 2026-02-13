import express from "express"
import {create} from "./gaming-platforms/create"
import {getById} from "./gaming-platforms/getById"
import {getAll} from "./gaming-platforms/getAll"
import {deleteNode} from "./gaming-platforms/deleteNode"
import {createFeaturesRacingGameRelation} from "./gaming-platforms/createFeaturesRacingGameRelation"
import {getAllFeaturesRacingGameRelations} from "./gaming-platforms/getAllFeaturesRacingGameRelations"
import {deleteFeaturesRacingGameRelation} from "./gaming-platforms/deleteFeaturesRacingGameRelation"
import {createHasImageRelation} from "./gaming-platforms/createHasImageRelation"
import {getAllHasImageRelations} from "./gaming-platforms/getAllHasImageRelations"
import {deleteHasImageRelation} from "./gaming-platforms/deleteHasImageRelation"

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
}
