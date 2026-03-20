import express from "express"
import {create} from "./prices/create"
import {getById} from "./prices/getById"
import {getAll} from "./prices/getAll"
import {deleteNode} from "./prices/deleteNode"
import {createForCarModelVariantRelation} from "./prices/createForCarModelVariantRelation"
import {getForCarModelVariantRelation} from "./prices/getForCarModelVariantRelation"
import {deleteForCarModelVariantRelation} from "./prices/deleteForCarModelVariantRelation"
import {createHasImageRelation} from "./prices/createHasImageRelation"
import {getAllHasImageRelations} from "./prices/getAllHasImageRelations"
import {deleteHasImageRelation} from "./prices/deleteHasImageRelation"

export const PriceController = {
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

    async createForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createForCarModelVariantRelation(req, res)
    },

    async getForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await getForCarModelVariantRelation(req, res)
    },

    async deleteForCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deleteForCarModelVariantRelation(req, res)
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
