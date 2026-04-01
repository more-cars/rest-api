import express from "express"
import {getById} from "./nodes/getById"
import {getNodesPrimeImage} from "./nodes/getNodesPrimeImage"

export const NodeController = {
    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getNodesPrimeImage(req: express.Request, res: express.Response) {
        await getNodesPrimeImage(req, res)
    },
}
