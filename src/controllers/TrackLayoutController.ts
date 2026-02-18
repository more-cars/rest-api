import express from "express"
import {create} from "./node-types/track-layouts/create"
import {getById} from "./node-types/track-layouts/getById"
import {getAll} from "./node-types/track-layouts/getAll"
import {deleteNode} from "./node-types/track-layouts/deleteNode"
import {createBelongsToRaceTrackRelation} from "./node-types/track-layouts/createBelongsToRaceTrackRelation"
import {getBelongsToRaceTrackRelation} from "./node-types/track-layouts/getBelongsToRaceTrackRelation"
import {deleteBelongsToRaceTrackRelation} from "./node-types/track-layouts/deleteBelongsToRaceTrackRelation"
import {createWasUsedByRacingEventRelation} from "./node-types/track-layouts/createWasUsedByRacingEventRelation"
import {getAllWasUsedByRacingEventRelations} from "./node-types/track-layouts/getAllWasUsedByRacingEventRelations"
import {deleteWasUsedByRacingEventRelation} from "./node-types/track-layouts/deleteWasUsedByRacingEventRelation"
import {createHasLapTimeRelation} from "./node-types/track-layouts/createHasLapTimeRelation"
import {getAllHasLapTimeRelations} from "./node-types/track-layouts/getAllHasLapTimeRelations"
import {deleteHasLapTimeRelation} from "./node-types/track-layouts/deleteHasLapTimeRelation"
import {createIsFeaturedInRacingGameRelation} from "./node-types/track-layouts/createIsFeaturedInRacingGameRelation"
import {getAllIsFeaturedInRacingGameRelations} from "./node-types/track-layouts/getAllIsFeaturedInRacingGameRelations"
import {deleteIsFeaturedInRacingGameRelation} from "./node-types/track-layouts/deleteIsFeaturedInRacingGameRelation"
import {createHasImageRelation} from "./node-types/track-layouts/createHasImageRelation"
import {getAllHasImageRelations} from "./node-types/track-layouts/getAllHasImageRelations"
import {deleteHasImageRelation} from "./node-types/track-layouts/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./node-types/track-layouts/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./node-types/track-layouts/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./node-types/track-layouts/deleteHasPrimeImageRelation"

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
