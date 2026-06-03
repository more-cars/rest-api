import express from "express"
import {root} from "./root/root"

export const RootController = {
    async root(req: express.Request, res: express.Response) {
        await root(req, res)
    },
}
