import express from "express"
import {create} from "./node-types/racing-games/create"
import {getById} from "./node-types/racing-games/getById"
import {getAll} from "./node-types/racing-games/getAll"
import {deleteNode} from "./node-types/racing-games/deleteNode"
import {createFeaturesCarModelVariantRelation} from "./node-types/racing-games/createFeaturesCarModelVariantRelation"
import {getAllFeaturesCarModelVariantRelations} from "./node-types/racing-games/getAllFeaturesCarModelVariantRelations"
import {deleteFeaturesCarModelVariantRelation} from "./node-types/racing-games/deleteFeaturesCarModelVariantRelation"
import {createFeaturesTrackLayoutRelation} from "./node-types/racing-games/createFeaturesTrackLayoutRelation"
import {getAllFeaturesTrackLayoutRelations} from "./node-types/racing-games/getAllFeaturesTrackLayoutRelations"
import {deleteFeaturesTrackLayoutRelation} from "./node-types/racing-games/deleteFeaturesTrackLayoutRelation"
import {createReleasedOnGamingPlatformRelation} from "./node-types/racing-games/createReleasedOnGamingPlatformRelation"
import {getAllReleasedOnGamingPlatformRelations} from "./node-types/racing-games/getAllReleasedOnGamingPlatformRelations"
import {deleteReleasedOnGamingPlatformRelation} from "./node-types/racing-games/deleteReleasedOnGamingPlatformRelation"
import {createHasImageRelation} from "./node-types/racing-games/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/racing-games/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/racing-games/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/racing-games/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/racing-games/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/racing-games/deleteHasPrimeImageRelation"

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

    async createReleasedOnGamingPlatformRelation(req: express.Request, res: express.Response) {
        await createReleasedOnGamingPlatformRelation(req, res)
    },

    async getAllReleasedOnGamingPlatformRelations(req: express.Request, res: express.Response) {
        await getAllReleasedOnGamingPlatformRelations(req, res)
    },

    async deleteReleasedOnGamingPlatformRelation(req: express.Request, res: express.Response) {
        await deleteReleasedOnGamingPlatformRelation(req, res)
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
