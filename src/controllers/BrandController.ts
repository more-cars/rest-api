import express from "express"
import {create} from "./brands/create"
import {getById} from "./brands/getById"
import {getAll} from "./brands/getAll"
import {deleteNode} from "./brands/deleteNode"
import {createHasCarModelRelation} from "./brands/createHasCarModelRelation"
import {getHasCarModelRelation} from "./brands/getHasCarModelRelation"
import {getHasCarModelRelations} from "./brands/getHasCarModelRelations"
import {createHasImageRelation} from "./brands/createHasImageRelation"
import {getHasImageRelation} from "./brands/getHasImageRelation"
import {getHasImageRelations} from "./brands/getHasImageRelations"

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
        await getHasCarModelRelation(req, res)
    }

    static async getAllHasCarModelRelations(req: express.Request, res: express.Response) {
        await getHasCarModelRelations(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async getSpecificHasImageRelation(req: express.Request, res: express.Response) {
        await getHasImageRelation(req, res)
    }

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getHasImageRelations(req, res)
    }
}
