import express from "express"
import {create} from "./carModels/create"
import {getById} from "./carModels/getById"
import {getAll} from "./carModels/getAll"
import {deleteNode} from "./carModels/deleteNode"
import {createBelongsToBrandRelation} from "./carModels/createBelongsToBrandRelation"
import {getBelongsToBrandRelation} from "./carModels/getBelongsToBrandRelation"
import {createHasImageRelation} from "./carModels/createHasImageRelation"
import {getSpecificHasImageRelation} from "./carModels/getSpecificHasImageRelation"
import {getAllHasImageRelations} from "./carModels/getAllHasImageRelations"
import {deleteHasImageRelation} from "./carModels/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./carModels/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./carModels/getHasPrimeImageRelation"
import {getSpecificHasPrimeImageRelation} from "./carModels/getSpecificHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./carModels/deleteHasPrimeImageRelation"
import {deleteBelongsToBrandRelation} from "./carModels/deleteBelongsToBrandRelation"

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

    static async deleteBelongsToBrandRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToBrandRelation(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async getSpecificHasImageRelation(req: express.Request, res: express.Response) {
        await getSpecificHasImageRelation(req, res)
    }

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    }

    static async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    }

    static async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    }

    static async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    }

    static async getSpecificHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getSpecificHasPrimeImageRelation(req, res)
    }

    static async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    }
}
