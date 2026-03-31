import express from "express"
import {create} from "./racing-sessions/create"
import {getById} from "./racing-sessions/getById"
import {getAll} from "./racing-sessions/getAll"
import {deleteNode} from "./racing-sessions/deleteNode"
import {createBelongsToRacingEventRelation} from "./racing-sessions/createBelongsToRacingEventRelation"
import {getBelongsToRacingEventRelation} from "./racing-sessions/getBelongsToRacingEventRelation"
import {deleteBelongsToRacingEventRelation} from "./racing-sessions/deleteBelongsToRacingEventRelation"
import {createHasSessionResultRelation} from "./racing-sessions/createHasSessionResultRelation"
import {getAllHasSessionResultRelations} from "./racing-sessions/getAllHasSessionResultRelations"
import {deleteHasSessionResultRelation} from "./racing-sessions/deleteHasSessionResultRelation"
import {createHasImageRelation} from "./racing-sessions/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-sessions/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-sessions/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-sessions/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./racing-sessions/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./racing-sessions/deleteHasPrimeImageRelation"
import {createHasVideoRelation} from "./racing-sessions/createHasVideoRelation"
import {getAllHasVideoRelations} from "./racing-sessions/getAllHasVideoRelations"
import {deleteHasVideoRelation} from "./racing-sessions/deleteHasVideoRelation"
import {createHasMainVideoRelation} from "./racing-sessions/createHasMainVideoRelation"
import {getHasMainVideoRelation} from "./racing-sessions/getHasMainVideoRelation"
import {deleteHasMainVideoRelation} from "./racing-sessions/deleteHasMainVideoRelation"

export const RacingSessionController = {
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

    async createBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingEventRelation(req, res)
    },

    async getBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingEventRelation(req, res)
    },

    async deleteBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingEventRelation(req, res)
    },

    async createHasSessionResultRelation(req: express.Request, res: express.Response) {
        await createHasSessionResultRelation(req, res)
    },

    async getAllHasSessionResultRelations(req: express.Request, res: express.Response) {
        await getAllHasSessionResultRelations(req, res)
    },

    async deleteHasSessionResultRelation(req: express.Request, res: express.Response) {
        await deleteHasSessionResultRelation(req, res)
    },

    async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    },

    async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    },

    async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    },

    async createHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await createHasPrimeImageRelation(req, res)
    },

    async getHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await getHasPrimeImageRelation(req, res)
    },

    async deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
        await deleteHasPrimeImageRelation(req, res)
    },

    async createHasVideoRelation(req: express.Request, res: express.Response) {
        await createHasVideoRelation(req, res)
    },

    async getAllHasVideoRelations(req: express.Request, res: express.Response) {
        await getAllHasVideoRelations(req, res)
    },

    async deleteHasVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasVideoRelation(req, res)
    },

    async createHasMainVideoRelation(req: express.Request, res: express.Response) {
        await createHasMainVideoRelation(req, res)
    },

    async getHasMainVideoRelation(req: express.Request, res: express.Response) {
        await getHasMainVideoRelation(req, res)
    },

    async deleteHasMainVideoRelation(req: express.Request, res: express.Response) {
        await deleteHasMainVideoRelation(req, res)
    },
}
