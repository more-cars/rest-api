import express from "express"
import {create} from "./track-layouts/create"
import {getById} from "./track-layouts/getById"
import {getAll} from "./track-layouts/getAll"
import {deleteNode} from "./track-layouts/deleteNode"
import {createBelongsToRaceTrackRelation} from "./track-layouts/createBelongsToRaceTrackRelation"
import {getBelongsToRaceTrackRelation} from "./track-layouts/getBelongsToRaceTrackRelation"
import {deleteBelongsToRaceTrackRelation} from "./track-layouts/deleteBelongsToRaceTrackRelation"
import {createWasUsedByRacingEventRelation} from "./track-layouts/createWasUsedByRacingEventRelation"
import {getAllWasUsedByRacingEventRelations} from "./track-layouts/getAllWasUsedByRacingEventRelations"
import {deleteWasUsedByRacingEventRelation} from "./track-layouts/deleteWasUsedByRacingEventRelation"
import {createHasLapTimeRelation} from "./track-layouts/createHasLapTimeRelation"
import {getAllHasLapTimeRelations} from "./track-layouts/getAllHasLapTimeRelations"
import {deleteHasLapTimeRelation} from "./track-layouts/deleteHasLapTimeRelation"
import {createIsFeaturedInRacingGameRelation} from "./track-layouts/createIsFeaturedInRacingGameRelation"
import {getAllIsFeaturedInRacingGameRelations} from "./track-layouts/getAllIsFeaturedInRacingGameRelations"
import {deleteIsFeaturedInRacingGameRelation} from "./track-layouts/deleteIsFeaturedInRacingGameRelation"
import {createHasImageRelation} from "./track-layouts/createHasImageRelation"
import {getAllHasImageRelations} from "./track-layouts/getAllHasImageRelations"
import {deleteHasImageRelation} from "./track-layouts/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./track-layouts/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./track-layouts/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./track-layouts/deleteHasPrimeImageRelation"

export const TrackLayoutController = {
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

    async createBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await createBelongsToRaceTrackRelation(req, res)
    },

    async getBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await getBelongsToRaceTrackRelation(req, res)
    },

    async deleteBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRaceTrackRelation(req, res)
    },

    async createWasUsedByRacingEventRelation(req: express.Request, res: express.Response) {
        await createWasUsedByRacingEventRelation(req, res)
    },

    async getAllWasUsedByRacingEventRelations(req: express.Request, res: express.Response) {
        await getAllWasUsedByRacingEventRelations(req, res)
    },

    async deleteWasUsedByRacingEventRelation(req: express.Request, res: express.Response) {
        await deleteWasUsedByRacingEventRelation(req, res)
    },

    async createHasLapTimeRelation(req: express.Request, res: express.Response) {
        await createHasLapTimeRelation(req, res)
    },

    async getAllHasLapTimeRelations(req: express.Request, res: express.Response) {
        await getAllHasLapTimeRelations(req, res)
    },

    async deleteHasLapTimeRelation(req: express.Request, res: express.Response) {
        await deleteHasLapTimeRelation(req, res)
    },

    async createIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await createIsFeaturedInRacingGameRelation(req, res)
    },

    async getAllIsFeaturedInRacingGameRelations(req: express.Request, res: express.Response) {
        await getAllIsFeaturedInRacingGameRelations(req, res)
    },

    async deleteIsFeaturedInRacingGameRelation(req: express.Request, res: express.Response) {
        await deleteIsFeaturedInRacingGameRelation(req, res)
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
