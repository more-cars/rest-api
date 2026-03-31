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
import {createReleasedOnGamingPlatformRelation} from "./racing-games/createReleasedOnGamingPlatformRelation"
import {getAllReleasedOnGamingPlatformRelations} from "./racing-games/getAllReleasedOnGamingPlatformRelations"
import {deleteReleasedOnGamingPlatformRelation} from "./racing-games/deleteReleasedOnGamingPlatformRelation"
import {createHasImageRelation} from "./racing-games/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-games/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-games/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-games/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./racing-games/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./racing-games/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./racing-games/createHasVideoRelation"
import {getAllHasVideoRelations} from "./racing-games/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./racing-games/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./racing-games/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./racing-games/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./racing-games/deleteHasMainVideoRelation"

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

    async createHasVideoRelation(req: express.Request, res: express.Response) {
        await createHasVideoRelation(req, res)
    },

    async getAllHasVideoRelations(req: express.Request, res: express.Response) {
        await getAllHasVideoRelations(req, res)
    },

    async deleteHasVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasVideoRelation(req, res)
    },

    async createHasMainVideoRelation(req: express.Request, res: express.Response) {
        await createHasMainVideoRelation(req, res)
    },

    async getHasMainVideoRelation(req: express.Request, res: express.Response) {
        await getHasMainVideoRelation(req, res)
    },

    async deleteHasMainVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasMainVideoRelation(req, res)
    },
}
