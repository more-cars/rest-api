import express from "express"
import {create} from "./companies/create"
import {getById} from "./companies/getById"
import {getAll} from "./companies/getAll"
import {deleteNode} from "./companies/deleteNode"
import {createHasBrandRelation} from "./companies/createHasBrandRelation"
import {getAllHasBrandRelations} from "./companies/getAllHasBrandRelations"
import {deleteHasBrandRelation} from "./companies/deleteHasBrandRelation"
import {createHasImageRelation} from "./companies/createHasImageRelation"
import {createHasPrimeImageRelation} from "./companies/createHasPrimeImageRelation"
import {getAllHasImageRelations} from "./companies/getAllHasImageRelations"
import {getHasPrimeImageRelation} from "./companies/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./companies/deleteHasPrimeImageRelation"

export class CompanyController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }

    static async createHasBrandRelation(req: express.Request, res: express.Response) {
        await createHasBrandRelation(req, res)
    }

    static async getAllHasBrandRelations(req: express.Request, res: express.Response) {
        await getAllHasBrandRelations(req, res)
    }

    static async deleteHasBrandRelation(req: express.Request, res: express.Response) {
        await deleteHasBrandRelation(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    }

    static async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    }

    static async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    }
}
