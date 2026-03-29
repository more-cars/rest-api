import express from "express"
import {create} from "./videos/create"
import {getById} from "./videos/getById"
import {getAll} from "./videos/getAll"
import {deleteNode} from "./videos/deleteNode"
import {createBelongsToNodeRelation} from "./videos/createBelongsToNodeRelation"
import {getAllBelongsToNodeRelations} from "./videos/getAllBelongsToNodeRelations"
import {deleteBelongsToNodeRelation} from "./videos/deleteBelongsToNodeRelation"

export const VideoController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    },

    async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    },

    async createBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await createBelongsToNodeRelation(req, res)
    },

    async getAllBelongsToNodeRelations(req: express.Request, res: express.Response) {
        await getAllBelongsToNodeRelations(req, res)
    },

    async deleteBelongsToNodeRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToNodeRelation(req, res)
    },
}
