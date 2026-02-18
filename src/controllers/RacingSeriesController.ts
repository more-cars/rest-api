import express from "express"
import {create} from "./node-types/racing-series/create"
import {getById} from "./node-types/racing-series/getById"
import {getAll} from "./node-types/racing-series/getAll"
import {deleteNode} from "./node-types/racing-series/deleteNode"
import {createHasRacingEventRelation} from "./node-types/racing-series/createHasRacingEventRelation"
import {getAllHasRacingEventRelations} from "./node-types/racing-series/getAllHasRacingEventRelations"
import {deleteHasRacingEventRelation} from "./node-types/racing-series/deleteHasRacingEventRelation"
import {createHasImageRelation} from "./node-types/racing-series/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/racing-series/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/racing-series/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/racing-series/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/racing-series/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/racing-series/deleteHasPrimeImageRelation"

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
