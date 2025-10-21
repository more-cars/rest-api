import express from "express"
import {create} from "./track-layouts/create"
import {getById} from "./track-layouts/getById"
import {getAll} from "./track-layouts/getAll"
import {deleteNode} from "./track-layouts/deleteNode"

export class TrackLayoutController {
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
}
