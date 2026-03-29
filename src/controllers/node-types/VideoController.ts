import express from "express"
import {create} from "./videos/create"
import {getById} from "./videos/getById"
import {getAll} from "./videos/getAll"

export const VideoController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },
}
