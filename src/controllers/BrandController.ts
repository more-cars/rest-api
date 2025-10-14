import express from "express"
import {create} from "./brands/create"
import {getById} from "./brands/getById"
import {getAll} from "./brands/getAll"
import {deleteNode} from "./brands/deleteNode"
import {createHasCarModelRelation} from "./brands/createHasCarModelRelation"
import {getSpecificHasCarModelRelation} from "./brands/getSpecificHasCarModelRelation"
import {getAllHasCarModelRelations} from "./brands/getAllHasCarModelRelations"
import {deleteHasCarModelRelation} from "./brands/deleteHasCarModelRelation"
import {createHasImageRelation} from "./brands/createHasImageRelation"
import {getSpecificHasImageRelation} from "./brands/getSpecificHasImageRelation"
import {getAllHasImageRelations} from "./brands/getAllHasImageRelations"
import {deleteHasImageRelation} from "./brands/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./brands/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./brands/getHasPrimeImageRelation"

export class BrandController {
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

    static async createHasCarModelRelation(req: express.Request, res: express.Response) {
        await createHasCarModelRelation(req, res)
    }

    static async getSpecificHasCarModelRelation(req: express.Request, res: express.Response) {
        await getSpecificHasCarModelRelation(req, res)
    }

    static async getAllHasCarModelRelations(req: express.Request, res: express.Response) {
        await getAllHasCarModelRelations(req, res)
    }

    static async deleteHasCarModelRelation(req: express.Request, res: express.Response) {
        await deleteHasCarModelRelation(req, res)
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
}
