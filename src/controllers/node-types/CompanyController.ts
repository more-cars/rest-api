import express from "express"
import {create} from "./companies/create"
import {getById} from "./companies/getById"
import {getAll} from "./companies/getAll"
import {deleteNode} from "./companies/deleteNode"
import {createHasBrandRelation} from "./companies/createHasBrandRelation"
import {getAllHasBrandRelations} from "./companies/getAllHasBrandRelations"
import {deleteHasBrandRelation} from "./companies/deleteHasBrandRelation"
import {createHasImageRelation} from "./companies/createHasImageRelation"
import {getAllHasImageRelations} from "./companies/getAllHasImageRelations"
import {deleteHasImageRelation} from "./companies/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./companies/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./companies/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./companies/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./companies/createHasVideoRelation"
import {getAllHasVideoRelations} from "./companies/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./companies/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./companies/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./companies/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./companies/deleteHasMainVideoRelation"

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
