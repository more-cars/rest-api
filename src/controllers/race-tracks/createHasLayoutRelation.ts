import express from "express"
import {RaceTrack} from "../../models/race-tracks/RaceTrack"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"

import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasLayoutRelation(req: express.Request, res: express.Response) {
    const raceTrackId = parseInt(req.params.raceTrackId)
    const trackLayoutId = parseInt(req.params.trackLayoutId)

    try {
        const relation = await RaceTrack.createHasLayoutRelationship(raceTrackId, trackLayoutId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.TRACK_LAYOUT)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)

        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
