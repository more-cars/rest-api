import express from "express"
import {create} from "./programme-episodes/create"
import {getById} from "./programme-episodes/getById"
import {getAll} from "./programme-episodes/getAll"
import {deleteNode} from "./programme-episodes/deleteNode"

export const ProgrammeEpisodeController = {
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
