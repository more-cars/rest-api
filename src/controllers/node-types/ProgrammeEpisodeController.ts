import express from "express"
import {create} from "./programme-episodes/create"
import {getById} from "./programme-episodes/getById"
import {getAll} from "./programme-episodes/getAll"
import {deleteNode} from "./programme-episodes/deleteNode"
import {createBelongsToProgrammeRelation} from "./programme-episodes/createBelongsToProgrammeRelation"
import {getBelongsToProgrammeRelation} from "./programme-episodes/getBelongsToProgrammeRelation"
import {deleteBelongsToProgrammeRelation} from "./programme-episodes/deleteBelongsToProgrammeRelation"
import {createIsFollowedByEpisodeRelation} from "./programme-episodes/createIsFollowedByEpisodeRelation"
import {getIsFollowedByEpisodeRelation} from "./programme-episodes/getIsFollowedByEpisodeRelation"
import {createCoversCarModelRelation} from "./programme-episodes/createCoversCarModelRelation"
import {getAllCoversCarModelRelations} from "./programme-episodes/getAllCoversCarModelRelations"
import {deleteCoversCarModelRelation} from "./programme-episodes/deleteCoversCarModelRelation"
import {createFeaturesCarModelVariantRelation} from "./programme-episodes/createFeaturesCarModelVariantRelation"
import {getAllFeaturesCarModelVariantRelations} from "./programme-episodes/getAllFeaturesCarModelVariantRelations"
import {deleteFeaturesCarModelVariantRelation} from "./programme-episodes/deleteFeaturesCarModelVariantRelation"

export const ProgrammeEpisodeController = {
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

    async createBelongsToProgrammeRelation(req: express.Request, res: express.Response) {
        await createBelongsToProgrammeRelation(req, res)
    },

    async getBelongsToProgrammeRelation(req: express.Request, res: express.Response) {
        await getBelongsToProgrammeRelation(req, res)
    },

    async deleteBelongsToProgrammeRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToProgrammeRelation(req, res)
    },

    async createIsFollowedByEpisodeRelation(req: express.Request, res: express.Response) {
        await createIsFollowedByEpisodeRelation(req, res)
    },

    async getIsFollowedByEpisodeRelation(req: express.Request, res: express.Response) {
        await getIsFollowedByEpisodeRelation(req, res)
    },

    async createCoversCarModelRelation(req: express.Request, res: express.Response) {
        await createCoversCarModelRelation(req, res)
    },

    async getAllCoversCarModelRelations(req: express.Request, res: express.Response) {
        await getAllCoversCarModelRelations(req, res)
    },

    async deleteCoversCarModelRelation(req: express.Request, res: express.Response) {
        await deleteCoversCarModelRelation(req, res)
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
}
