import express from "express"
import {create} from "./node-types/companies/create"
import {getById} from "./node-types/companies/getById"
import {getAll} from "./node-types/companies/getAll"
import {deleteNode} from "./node-types/companies/deleteNode"
import {createHasBrandRelation} from "./node-types/companies/createHasBrandRelation"
import {getAllHasBrandRelations} from "./node-types/companies/getAllHasBrandRelations"
import {deleteHasBrandRelation} from "./node-types/companies/deleteHasBrandRelation"
import {createHasImageRelation} from "./node-types/companies/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/companies/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/companies/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/companies/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/companies/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/companies/deleteHasPrimeImageRelation"

export const CompanyController = {
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

    async createHasBrandRelation(req: express.Request, res: express.Response) {
        await createHasBrandRelation(req, res)
    },

    async getAllHasBrandRelations(req: express.Request, res: express.Response) {
        await getAllHasBrandRelations(req, res)
    },

    async deleteHasBrandRelation(req: express.Request, res: express.Response) {
        await deleteHasBrandRelation(req, res)
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
}
