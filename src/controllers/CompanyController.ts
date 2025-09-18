import express from "express"
import {create} from "./companies/create"
import {getById} from "./companies/getById"

export class CompanyController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
