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
import {createHasImageRelation} from "./racing-events/createHasImageRelation"
import {getAllHasImageRelations} from "./racing-events/getAllHasImageRelations"
import {deleteHasImageRelation} from "./racing-events/deleteHasImageRelation"

export class RacingEventController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)
    }

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }

    static async createBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await createBelongsToRacingSeriesRelation(req, res)
    }

    static async getBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await getBelongsToRacingSeriesRelation(req, res)
    }

    static async deleteBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
        await deleteBelongsToRacingSeriesRelation(req, res)
    }

    static async createIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await createIsFollowedByEventRelation(req, res)
    }

    static async getIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await getIsFollowedByEventRelation(req, res)
    }

    static async deleteIsFollowedByEventRelation(req: express.Request, res: express.Response) {
        await deleteIsFollowedByEventRelation(req, res)
    }

    static async createFollowsEventRelation(req: express.Request, res: express.Response) {
        await createFollowsEventRelation(req, res)
    }

    static async getFollowsEventRelation(req: express.Request, res: express.Response) {
        await getFollowsEventRelation(req, res)
    }

    static async deleteFollowsEventRelation(req: express.Request, res: express.Response) {
        await deleteFollowsEventRelation(req, res)
    }

    static async createTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await createTookPlaceAtRaceTrackRelation(req, res)
    }

    static async getTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await getTookPlaceAtRaceTrackRelation(req, res)
    }

    static async deleteTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
        await deleteTookPlaceAtRaceTrackRelation(req, res)
    }

    static async createUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await createUsedTheTrackLayoutRelation(req, res)
    }

    static async getUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await getUsedTheTrackLayoutRelation(req, res)
    }

    static async deleteUsedTheTrackLayoutRelation(req: express.Request, res: express.Response) {
        await deleteUsedTheTrackLayoutRelation(req, res)
    }

    static async createHasImageRelation(req: express.Request, res: express.Response) {
        await createHasImageRelation(req, res)
    }

    static async getAllHasImageRelations(req: express.Request, res: express.Response) {
        await getAllHasImageRelations(req, res)
    }

    static async deleteHasImageRelation(req: express.Request, res: express.Response) {
        await deleteHasImageRelation(req, res)
    }
}
