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
import {deleteHasImageRelation} from "./model-car-brands/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./model-car-brands/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./model-car-brands/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./model-car-brands/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./model-car-brands/createHasVideoRelation"
import {getAllHasVideoRelations} from "./model-car-brands/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./model-car-brands/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./model-car-brands/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./model-car-brands/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./model-car-brands/deleteHasMainVideoRelation"

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
