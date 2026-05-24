import express from "express"
import {createNode} from "./books/createNode"
import {getById} from "./books/getById"
import {getAll} from "./books/getAll"
import {updateNode} from "./books/updateNode"
import {deleteNode} from "./books/deleteNode"
import {createCoversCarModelVariantRelation} from "./books/createCoversCarModelVariantRelation"

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
}
