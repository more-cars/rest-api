import express from "express"
import {create} from "./magazine-issues/create"
import {getById} from "./magazine-issues/getById"

export const MagazineIssueController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
