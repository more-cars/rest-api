import express from "express"
import {create} from "./motor-shows/create"
import {getById} from "./motor-shows/getById"
import {getAll} from "./motor-shows/getAll"
import {deleteNode} from "./motor-shows/deleteNode"
import {createPresentsCarModelVariantRelation} from "./motor-shows/createPresentsCarModelVariantRelation"
import {getAllPresentsCarModelVariantRelations} from "./motor-shows/getAllPresentsCarModelVariantRelations"
import {deletePresentsCarModelVariantRelation} from "./motor-shows/deletePresentsCarModelVariantRelation"
import {createHasImageRelation} from "./motor-shows/createHasImageRelation"
import {getAllHasImageRelations} from "./motor-shows/getAllHasImageRelations"

export const MotorShowController = {
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

    async createPresentsCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createPresentsCarModelVariantRelation(req, res)
    },

    async getAllPresentsCarModelVariantRelations(req: express.Request, res: express.Response) {
        await getAllPresentsCarModelVariantRelations(req, res)
    },

    async deletePresentsCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deletePresentsCarModelVariantRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },
}
