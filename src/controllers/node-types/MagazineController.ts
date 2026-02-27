import express from "express"
import {create} from "./magazines/create"
import {getById} from "./magazines/getById"
import {getAll} from "./magazines/getAll"
import {deleteNode} from "./magazines/deleteNode"
import {createHasImageRelation} from "./magazines/createHasImageRelation"
import {getAllHasImageRelations} from "./magazines/getAllHasImageRelations"
import {deleteHasImageRelation} from "./magazines/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./magazines/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./magazines/getHasPrimeImageRelation"

export const MagazineController = {
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
}
