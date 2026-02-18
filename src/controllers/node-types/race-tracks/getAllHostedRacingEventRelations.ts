import express from "express"
import {RaceTrack} from "../../../models/race-tracks/RaceTrack"
import {marshalRelations} from "../../relationships/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHostedRacingEventRelations(req: express.Request, res: express.Response) {
    const raceTrackId = parseInt(req.params.raceTrackId)

    try {
        const relations = await RaceTrack.getAllHostedRacingEventRelationships(raceTrackId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.RACING_EVENT)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
