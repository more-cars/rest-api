import express from "express"
import {create} from "./model-car-brands/create"
import {getById} from "./model-car-brands/getById"
import {getAll} from "./model-car-brands/getAll"
import {deleteNode} from "./model-car-brands/deleteNode"
import {createCreatedModelCarRelation} from "./model-car-brands/createCreatedModelCarRelation"

export const ModelCarBrandController = {
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

    async createCreatedModelCarRelation(req: express.Request, res: express.Response) {
        await createCreatedModelCarRelation(req, res)
    },
}
