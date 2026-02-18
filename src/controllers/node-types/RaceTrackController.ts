import express from "express"
import {create} from "./race-tracks/create"
import {getById} from "./race-tracks/getById"
import {getAll} from "./race-tracks/getAll"
import {deleteNode} from "./race-tracks/deleteNode"
import {createHasLayoutRelation} from "./race-tracks/createHasLayoutRelation"
import {getAllHasLayoutRelations} from "./race-tracks/getAllHasLayoutRelations"
import {deleteHasLayoutRelation} from "./race-tracks/deleteHasLayoutRelation"
import {createHostedRacingEventRelation} from "./race-tracks/createHostedRacingEventRelation"
import {getAllHostedRacingEventRelations} from "./race-tracks/getAllHostedRacingEventRelations"
import {deleteHostedRacingEventRelation} from "./race-tracks/deleteHostedRacingEventRelation"
import {createHasImageRelation} from "./race-tracks/createHasImageRelation"
import {getAllHasImageRelations} from "./race-tracks/getAllHasImageRelations"
import {deleteHasImageRelation} from "./race-tracks/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./race-tracks/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./race-tracks/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./race-tracks/deleteHasPrimeImageRelation"

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
