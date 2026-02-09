import express from "express"
import {create} from "./racing-events/create"
import {getById} from "./racing-events/getById"
import {getAll} from "./racing-events/getAll"
import {deleteNode} from "./racing-events/deleteNode"
import {createBelongsToRacingSeriesRelation} from "./racing-events/createBelongsToRacingSeriesRelation"
import {getBelongsToRacingSeriesRelation} from "./racing-events/getBelongsToRacingSeriesRelation"
import {deleteBelongsToRacingSeriesRelation} from "./racing-events/deleteBelongsToRacingSeriesRelation"
import {createIsFollowedByEventRelation} from "./racing-events/createIsFollowedByEventRelation"
import {getIsFollowedByEventRelation} from "./racing-events/getIsFollowedByEventRelation"
import {deleteIsFollowedByEventRelation} from "./racing-events/deleteIsFollowedByEventRelation"
import {createFollowsEventRelation} from "./racing-events/createFollowsEventRelation"
import {getFollowsEventRelation} from "./racing-events/getFollowsEventRelation"
import {deleteFollowsEventRelation} from "./racing-events/deleteFollowsEventRelation"
import {createTookPlaceAtRaceTrackRelation} from "./racing-events/createTookPlaceAtRaceTrackRelation"
import {getTookPlaceAtRaceTrackRelation} from "./racing-events/getTookPlaceAtRaceTrackRelation"
import {deleteTookPlaceAtRaceTrackRelation} from "./racing-events/deleteTookPlaceAtRaceTrackRelation"
import {createUsedTheTrackLayoutRelation} from "./racing-events/createUsedTheTrackLayoutRelation"
import {getUsedTheTrackLayoutRelation} from "./racing-events/getUsedTheTrackLayoutRelation"
import {deleteUsedTheTrackLayoutRelation} from "./racing-events/deleteUsedTheTrackLayoutRelation"
import {createHasRacingSessionRelation} from "./racing-events/createHasRacingSessionRelation"
import {getAllHasRacingSessionRelations} from "./racing-events/getAllHasRacingSessionRelations"
import {deleteHasRacingSessionRelation} from "./racing-events/deleteHasRacingSessionRelation"
import {createHasImageRelation} from "./racing-events/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-events/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-events/deleteHasImageRelation"
import {createHasPrimeImageRelation} from "./racing-events/createHasPrimeImageRelation"
import {getHasPrimeImageRelation} from "./racing-events/getHasPrimeImageRelation"
import {deleteHasPrimeImageRelation} from "./racing-events/deleteHasPrimeImageRelation"

export const RacingEventController = {
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

    async createBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingSeriesRelation(req, res)
    },

    async getBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingSeriesRelation(req, res)
    },

    async deleteBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingSeriesRelation(req, res)
    },

    async createIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await createIsFollowedByEventRelation(req, res)
    },

    async getIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await getIsFollowedByEventRelation(req, res)
    },

    async deleteIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await deleteIsFollowedByEventRelation(req, res)
    },

    async createFollowsEventRelation(req: express.Request, res: express.Response) {
        await createFollowsEventRelation(req, res)
    },

    async getFollowsEventRelation(req: express.Request, res: express.Response) {
        await getFollowsEventRelation(req, res)
    },

    async deleteFollowsEventRelation(req: express.Request, res: express.Response) {
        await deleteFollowsEventRelation(req, res)
    },

    async createTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await createTookPlaceAtRaceTrackRelation(req, res)
    },

    async getTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await getTookPlaceAtRaceTrackRelation(req, res)
    },

    async deleteTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await deleteTookPlaceAtRaceTrackRelation(req, res)
    },

    async createUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await createUsedTheTrackLayoutRelation(req, res)
    },

    async getUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await getUsedTheTrackLayoutRelation(req, res)
    },

    async deleteUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await deleteUsedTheTrackLayoutRelation(req, res)
    },

    async createHasRacingSessionRelation(req: express.Request, res: express.Response) {
        await createHasRacingSessionRelation(req, res)
    },

    async getAllHasRacingSessionRelations(req: express.Request, res: express.Response) {
        await getAllHasRacingSessionRelations(req, res)
    },

    async deleteHasRacingSessionRelation(req: express.Request, res: express.Response) {
        await deleteHasRacingSessionRelation(req, res)
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
