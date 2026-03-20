import express from "express"
import {create} from "./prices/create"
import {getById} from "./prices/getById"
import {getAll} from "./prices/getAll"
import {deleteNode} from "./prices/deleteNode"
import {createForCarModelVariantRelation} from "./prices/createForCarModelVariantRelation"

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
}
