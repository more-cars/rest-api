import express from "express"
import {create} from "./images/create"
import {getById} from "./images/getById"
import {getAll} from "./images/getAll"
import {deleteNode} from "./images/deleteNode"
import {createBelongsToNodeRelation} from "./images/createBelongsToNodeRelation"
import {getSpecificBelongsToNodeRelation} from "./images/getSpecificBelongsToNodeRelation"
import {getAllBelongsToNodeRelations} from "./images/getAllBelongsToNodeRelations"
import {getAllBelongsToNodeTypeRelations} from "./images/getAllBelongsToNodeTypeRelations"

export class ImageController {
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

    static async createBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await createBelongsToNodeRelation(req, res)
    }

    static async getSpecificBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await getSpecificBelongsToNodeRelation(req, res)
    }

    static async getAllBelongsToNodeRelations(req: express.Request, res: express.Response) {
        await getAllBelongsToNodeRelations(req, res)
    }

    static async getAllBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
        await getAllBelongsToNodeTypeRelations(req, res)
    }
}
