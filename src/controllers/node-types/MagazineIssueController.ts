import express from "express"
import {create} from "./magazine-issues/create"

export const MagazineIssueController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
