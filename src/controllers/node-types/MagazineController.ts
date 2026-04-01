import express from "express"
import {create} from "./magazines/create"
import {getById} from "./magazines/getById"
import {getAll} from "./magazines/getAll"
import {deleteNode} from "./magazines/deleteNode"
import {createHasIssueRelation} from "./magazines/createHasIssueRelation"
import {getAllHasIssueRelations} from "./magazines/getAllHasIssueRelations"
import {deleteHasIssueRelation} from "./magazines/deleteHasIssueRelation"
import {createHasImageRelation} from "./magazines/createHasImageRelation"
import {getAllHasImageRelations} from "./magazines/getAllHasImageRelations"
import {deleteHasImageRelation} from "./magazines/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./magazines/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./magazines/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./magazines/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./magazines/createHasVideoRelation"
import {getAllHasVideoRelations} from "./magazines/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./magazines/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./magazines/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./magazines/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./magazines/deleteHasMainVideoRelation"

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

    async createHasIssueRelation(req: express.Request, res: express.Response) {
        await createHasIssueRelation(req, res)
    },

    async getAllHasIssueRelations(req: express.Request, res: express.Response) {
        await getAllHasIssueRelations(req, res)
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

    async deleteHasIssueRelation(req: express.Request, res: express.Response) {
        await deleteHasIssueRelation(req, res)
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
