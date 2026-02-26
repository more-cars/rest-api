import express from "express"
import {create} from "./magazines/create"
import {getById} from "./magazines/getById"
import {getAll} from "./magazines/getAll"
import {deleteNode} from "./magazines/deleteNode"

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
}
