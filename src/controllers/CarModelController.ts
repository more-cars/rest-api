import express from "express"
import {create} from "./carModels/create"
import {getById} from "./carModels/getById"
import {getAll} from "./carModels/getAll"
import {deleteNode} from "./carModels/deleteNode"
import {createBelongsToBrandRelation} from "./carModels/createBelongsToBrandRelation"
import {getBelongsToBrandRelation} from "./carModels/getBelongsToBrandRelation"
import {createHasImageRelation} from "./carModels/createHasImageRelation"
import {getHasImageRelation} from "./carModels/getHasImageRelation"
import {getHasImageRelations} from "./carModels/getHasImageRelations"
import {createHasPrimeImageRelation} from "./carModels/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./carModels/getHasPrimeImageRelation"

export class CarModelController {
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

    static async createBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await createBelongsToBrandRelation(req, res)
    }

    static async getBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await getBelongsToBrandRelation(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async getHasImageRelation(req: express.Request, res: express.Response) {
        await getHasImageRelation(req, res)
    }

    static async getHasImageRelations(req: express.Request, res: express.Response) {
        await getHasImageRelations(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }

    static async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    }
}
