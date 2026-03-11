import express from "express"
import {create} from "./programmes/create"
import {getById} from "./programmes/getById"
import {getAll} from "./programmes/getAll"
import {deleteNode} from "./programmes/deleteNode"

export const ProgrammeController = {
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
