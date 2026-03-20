import express from "express"
import {create} from "./model-cars/create"
import {getById} from "./model-cars/getById"
import {getAll} from "./model-cars/getAll"
import {deleteNode} from "./model-cars/deleteNode"
import {createIsScaleModelOfCarModelVariantRelation} from "./model-cars/createIsScaleModelOfCarModelVariantRelation"

export const ModelCarController = {
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

    async createIsScaleModelOfCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createIsScaleModelOfCarModelVariantRelation(req, res)
    },
}
