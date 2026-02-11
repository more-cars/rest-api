import express from "express"
import {create} from "./racing-games/create"
import {getById} from "./racing-games/getById"
import {getAll} from "./racing-games/getAll"
import {deleteNode} from "./racing-games/deleteNode"
import {createFeaturesCarModelVariantRelation} from "./racing-games/createFeaturesCarModelVariantRelation"
import {getAllFeaturesCarModelVariantRelations} from "./racing-games/getAllFeaturesCarModelVariantRelations"
import {deleteFeaturesCarModelVariantRelation} from "./racing-games/deleteFeaturesCarModelVariantRelation"
import {createFeaturesTrackLayoutRelation} from "./racing-games/createFeaturesTrackLayoutRelation"
import {getAllFeaturesTrackLayoutRelations} from "./racing-games/getAllFeaturesTrackLayoutRelations"
import {deleteFeaturesTrackLayoutRelation} from "./racing-games/deleteFeaturesTrackLayoutRelation"
import {createHasImageRelation} from "./racing-games/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-games/getAllHasImageRelations"

export const RacingGameController = {
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

    async createFeaturesCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createFeaturesCarModelVariantRelation(req, res)
    },

    async getAllFeaturesCarModelVariantRelations(req: express.Request, res: express.Response) {
        await getAllFeaturesCarModelVariantRelations(req, res)
    },

    async deleteFeaturesCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deleteFeaturesCarModelVariantRelation(req, res)
    },

    async createFeaturesTrackLayoutRelation(req: express.Request, res: express.Response) {
        await createFeaturesTrackLayoutRelation(req, res)
    },

    async getAllFeaturesTrackLayoutRelations(req: express.Request, res: express.Response) {
        await getAllFeaturesTrackLayoutRelations(req, res)
    },

    async deleteFeaturesTrackLayoutRelation(req: express.Request, res: express.Response) {
        await deleteFeaturesTrackLayoutRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },
}
