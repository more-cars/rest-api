import express from "express"
import {RaceTrack} from "../../models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function deleteHasImageRelation(req: express.Request, res: express.Response) {
    const raceTrackId = parseInt(req.params.raceTrackId)
    const imageId = parseInt(req.params.imageId)

    try {
        await RaceTrack.deleteHasImageRelationship(raceTrackId, imageId)

        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
