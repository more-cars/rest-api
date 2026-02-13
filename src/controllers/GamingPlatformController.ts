import express from "express"
import {create} from "./gaming-platforms/create"
import {getById} from "./gaming-platforms/getById"
import {getAll} from "./gaming-platforms/getAll"
import {deleteNode} from "./gaming-platforms/deleteNode"
import {createFeaturesRacingGameRelation} from "./gaming-platforms/createFeaturesRacingGameRelation"

export const GamingPlatformController = {
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

    async createFeaturesRacingGameRelation(req: express.Request, res: express.Response) {
        await createFeaturesRacingGameRelation(req, res)
    },
}
