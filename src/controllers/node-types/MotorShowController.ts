import express from "express"
import {create} from "./motor-shows/create"
import {getById} from "./motor-shows/getById"
import {getAll} from "./motor-shows/getAll"

export const MotorShowController = {
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
