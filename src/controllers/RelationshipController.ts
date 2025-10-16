import express from "express"
import {getById} from "./relationships/getById"

export class RelationshipController {
    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
