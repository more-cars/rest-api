import express from "express"
import {create} from "./companies/create"

export class CompanyController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
