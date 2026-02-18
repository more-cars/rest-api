import express from "express"
import {create} from "./node-types/race-tracks/create"
import {getById} from "./node-types/race-tracks/getById"
import {getAll} from "./node-types/race-tracks/getAll"
import {deleteNode} from "./node-types/race-tracks/deleteNode"
import {createHasLayoutRelation} from "./node-types/race-tracks/createHasLayoutRelation"
import {getAllHasLayoutRelations} from "./node-types/race-tracks/getAllHasLayoutRelations"
import {deleteHasLayoutRelation} from "./node-types/race-tracks/deleteHasLayoutRelation"
import {createHostedRacingEventRelation} from "./node-types/race-tracks/createHostedRacingEventRelation"
import {getAllHostedRacingEventRelations} from "./node-types/race-tracks/getAllHostedRacingEventRelations"
import {deleteHostedRacingEventRelation} from "./node-types/race-tracks/deleteHostedRacingEventRelation"
import {createHasImageRelation} from "./node-types/race-tracks/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/race-tracks/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/race-tracks/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/race-tracks/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/race-tracks/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/race-tracks/deleteHasPrimeImageRelation"

export const RaceTrackController = {
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

    async createHasLayoutRelation(req: express.Request, res: express.Response) {
        await createHasLayoutRelation(req, res)
    },

    async getAllHasLayoutRelations(req: express.Request, res: express.Response) {
        await getAllHasLayoutRelations(req, res)
    },

    async deleteHasLayoutRelation(req: express.Request, res: express.Response) {
        await deleteHasLayoutRelation(req, res)
    },

    async createHostedRacingEventRelation(req: express.Request, res: express.Response) {
        await createHostedRacingEventRelation(req, res)
    },

    async getAllHostedRacingEventRelations(req: express.Request, res: express.Response) {
        await getAllHostedRacingEventRelations(req, res)
    },

    async deleteHostedRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteHostedRacingEventRelation(req, res)
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
