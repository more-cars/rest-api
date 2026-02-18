import express from "express"
import {create} from "./node-types/brands/create"
import {getById} from "./node-types/brands/getById"
import {getAll} from "./node-types/brands/getAll"
import {deleteNode} from "./node-types/brands/deleteNode"
import {createBelongsToCompanyRelation} from "./node-types/brands/createBelongsToCompanyRelation"
import {getBelongsToCompanyRelation} from "./node-types/brands/getBelongsToCompanyRelation"
import {deleteBelongsToCompanyRelation} from "./node-types/brands/deleteBelongsToCompanyRelation"
import {createHasCarModelRelation} from "./node-types/brands/createHasCarModelRelation"
import {getSpecificHasCarModelRelation} from "./node-types/brands/getSpecificHasCarModelRelation"
import {getAllHasCarModelRelations} from "./node-types/brands/getAllHasCarModelRelations"
import {deleteHasCarModelRelation} from "./node-types/brands/deleteHasCarModelRelation"
import {createHasImageRelation} from "./node-types/brands/createHasImageRelation"
import {getSpecificHasImageRelation} from "./node-types/brands/getSpecificHasImageRelation"
import {getAllHasImageRelations} from "./node-types/brands/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/brands/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/brands/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/brands/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/brands/deleteHasPrimeImageRelation"

export const BrandController = {
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

    async createBelongsToCompanyRelation(req: express.Request, res: express.Response) {
        await createBelongsToCompanyRelation(req, res)
    },

    async getBelongsToCompanyRelation(req: express.Request, res: express.Response) {
        await getBelongsToCompanyRelation(req, res)
    },

    async deleteBelongsToCompanyRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToCompanyRelation(req, res)
    },

    async createHasCarModelRelation(req: express.Request, res: express.Response) {
        await createHasCarModelRelation(req, res)
    },

    async getSpecificHasCarModelRelation(req: express.Request, res: express.Response) {
        await getSpecificHasCarModelRelation(req, res)
    },

    async getAllHasCarModelRelations(req: express.Request, res: express.Response) {
        await getAllHasCarModelRelations(req, res)
    },

    async deleteHasCarModelRelation(req: express.Request, res: express.Response) {
        await deleteHasCarModelRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getSpecificHasImageRelation(req: express.Request, res: express.Response) {
        await getSpecificHasImageRelation(req, res)
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
