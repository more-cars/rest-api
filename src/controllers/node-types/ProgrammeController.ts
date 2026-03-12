import express from "express"
import {create} from "./programmes/create"
import {getById} from "./programmes/getById"
import {getAll} from "./programmes/getAll"
import {deleteNode} from "./programmes/deleteNode"
import {createHasEpisodeRelation} from "./programmes/createHasEpisodeRelation"
import {getAllHasEpisodeRelations} from "./programmes/getAllHasEpisodeRelations"
import {deleteHasEpisodeRelation} from "./programmes/deleteHasEpisodeRelation"
import {createHasImageRelation} from "./programmes/createHasImageRelation"
import {getAllHasImageRelations} from "./programmes/getAllHasImageRelations"

export const ProgrammeController = {
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

    async createHasEpisodeRelation(req: express.Request, res: express.Response) {
        await createHasEpisodeRelation(req, res)
    },

    async getAllHasEpisodeRelations(req: express.Request, res: express.Response) {
        await getAllHasEpisodeRelations(req, res)
    },

    async deleteHasEpisodeRelation(req: express.Request, res: express.Response) {
        await deleteHasEpisodeRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },
}
