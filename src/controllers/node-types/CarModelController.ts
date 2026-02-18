import express from "express"
import {create} from "./car-models/create"
import {getById} from "./car-models/getById"
import {getAll} from "./car-models/getAll"
import {deleteNode} from "./car-models/deleteNode"
import {createBelongsToBrandRelation} from "./car-models/createBelongsToBrandRelation"
import {getBelongsToBrandRelation} from "./car-models/getBelongsToBrandRelation"
import {deleteBelongsToBrandRelation} from "./car-models/deleteBelongsToBrandRelation"
import {createHasSuccessorRelation} from "./car-models/createHasSuccessorRelation"
import {getHasSuccessorRelation} from "./car-models/getHasSuccessorRelation"
import {deleteHasSuccessorRelation} from "./car-models/deleteHasSuccessorRelation"
import {createIsSuccessorOfRelation} from "./car-models/createIsSuccessorOfRelation"
import {getIsSuccessorOfRelation} from "./car-models/getIsSuccessorOfRelation"
import {createHasVariantRelation} from "./car-models/createHasVariantRelation"
import {getAllHasVariantRelations} from "./car-models/getAllHasVariantRelations"
import {deleteHasVariantRelation} from "./car-models/deleteHasVariantRelation"
import {createHasImageRelation} from "./car-models/createHasImageRelation"
import {getSpecificHasImageRelation} from "./car-models/getSpecificHasImageRelation"
import {getAllHasImageRelations} from "./car-models/getAllHasImageRelations"
import {deleteHasImageRelation} from "./car-models/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./car-models/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./car-models/getHasPrimeImageRelation"
import {getSpecificHasPrimeImageRelation} from "./car-models/getSpecificHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./car-models/deleteHasPrimeImageRelation"
import {deleteIsSuccessorOfRelation} from "./car-models/deleteIsSuccessorOfRelation"

export const CarModelController = {
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

    async createBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await createBelongsToBrandRelation(req, res)
    },

    async getBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await getBelongsToBrandRelation(req, res)
    },

    async deleteBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToBrandRelation(req, res)
    },

    async createHasSuccessorRelation(req: express.Request, res: express.Response) {
        await createHasSuccessorRelation(req, res)
    },

    async getHasSuccessorRelation(req: express.Request, res: express.Response) {
        await getHasSuccessorRelation(req, res)
    },

    async deleteHasSuccessorRelation(req: express.Request, res: express.Response) {
        await deleteHasSuccessorRelation(req, res)
    },

    async createIsSuccessorOfRelation(req: express.Request, res: express.Response) {
        await createIsSuccessorOfRelation(req, res)
    },

    async getIsSuccessorOfRelation(req: express.Request, res: express.Response) {
        await getIsSuccessorOfRelation(req, res)
    },

    async deleteIsSuccessorOfRelation(req: express.Request, res: express.Response) {
        await deleteIsSuccessorOfRelation(req, res)
    },

    async createHasVariantRelation(req: express.Request, res: express.Response) {
        await createHasVariantRelation(req, res)
    },

    async getAllHasVariantRelations(req: express.Request, res: express.Response) {
        await getAllHasVariantRelations(req, res)
    },

    async deleteHasVariantRelation(req: express.Request, res: express.Response) {
        await deleteHasVariantRelation(req, res)
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

    async getSpecificHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getSpecificHasPrimeImageRelation(req, res)
    },

    async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    },
}
