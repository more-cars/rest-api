import express from "express"
import {create} from "./racing-series/create"
import {getById} from "./racing-series/getById"
import {getAll} from "./racing-series/getAll"
import {deleteNode} from "./racing-series/deleteNode"
import {createHasRacingEventRelation} from "./racing-series/createHasRacingEventRelation"
import {getAllHasRacingEventRelations} from "./racing-series/getAllHasRacingEventRelations"
import {deleteHasRacingEventRelation} from "./racing-series/deleteHasRacingEventRelation"
import {createHasImageRelation} from "./racing-series/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-series/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-series/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-series/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./racing-series/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./racing-series/deleteHasPrimeImageRelation"

export const RacingSeriesController = {
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

    async createHasRacingEventRelation(req: express.Request, res: express.Response) {
        await createHasRacingEventRelation(req, res)
    },

    async getAllHasRacingEventRelations(req: express.Request, res: express.Response) {
        await getAllHasRacingEventRelations(req, res)
    },

    async deleteHasRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteHasRacingEventRelation(req, res)
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
}
