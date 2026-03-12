import express from "express"
import {create} from "./programme-episodes/create"
import {getById} from "./programme-episodes/getById"
import {getAll} from "./programme-episodes/getAll"
import {deleteNode} from "./programme-episodes/deleteNode"
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
