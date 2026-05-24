import express from "express"
import {createNode} from "./books/createNode"

export const BookController = {
    async create(req: express.Request, res: express.Response) {
        await createNode(req, res)
    },
}
