import express from "express"
import {create} from "./model-car-brands/create"
import {getById} from "./model-car-brands/getById"
import {getAll} from "./model-car-brands/getAll"
import {deleteNode} from "./model-car-brands/deleteNode"
import {createCreatedModelCarRelation} from "./model-car-brands/createCreatedModelCarRelation"
import {getAllCreatedModelCarRelations} from "./model-car-brands/getAllCreatedModelCarRelations"
import {deleteCreatedModelCarRelation} from "./model-car-brands/deleteCreatedModelCarRelation"
import {createHasImageRelation} from "./model-car-brands/createHasImageRelation"
import {getAllHasImageRelations} from "./model-car-brands/getAllHasImageRelations"

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

    async getAllCreatedModelCarRelations(req: express.Request, res: express.Response) {
        await getAllCreatedModelCarRelations(req, res)
    },

    async deleteCreatedModelCarRelation(req: express.Request, res: express.Response) {
        await deleteCreatedModelCarRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },
}
