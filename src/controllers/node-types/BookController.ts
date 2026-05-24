import express from "express"
import {createNode} from "./books/createNode"
import {getById} from "./books/getById"
import {getAll} from "./books/getAll"
import {updateNode} from "./books/updateNode"
import {deleteNode} from "./books/deleteNode"
import {createCoversCarModelVariantRelation} from "./books/createCoversCarModelVariantRelation"
import {getAllCoversCarModelVariantRelations} from "./books/getAllCoversCarModelVariantRelations"
import {deleteCoversCarModelVariantRelation} from "./books/deleteCoversCarModelVariantRelation"
import {createHasVideoRelation} from "./books/createHasVideoRelation"
import {getAllHasVideoRelations} from "./books/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./books/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./books/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./books/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./books/deleteHasMainVideoRelation"

export const BookController = {
    async create(req: express.Request, res: express.Response) {
        await createNode(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },

    async update(req: express.Request, res: express.Response) {
        await updateNode(req, res)
    },

    async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    },

    async createCoversCarModelVariantRelation(req: express.Request, res: express.Response) {
        await createCoversCarModelVariantRelation(req, res)
    },

    async getAllCoversCarModelVariantRelations(req: express.Request, res: express.Response) {
        await getAllCoversCarModelVariantRelations(req, res)
    },

    async deleteCoversCarModelVariantRelation(req: express.Request, res: express.Response) {
        await deleteCoversCarModelVariantRelation(req, res)
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
