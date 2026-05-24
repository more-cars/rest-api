import express from "express"
import {createNode} from "./books/createNode"
import {getById} from "./books/getById"
import {getAll} from "./books/getAll"

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
}
