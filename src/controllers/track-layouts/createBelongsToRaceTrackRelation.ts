import express from "express"
import {TrackLayout} from "../../models/track-layouts/TrackLayout"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"

import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createBelongsToRaceTrackRelation(req: express.Request, res: express.Response) {
    const trackLayoutId = parseInt(req.params.trackLayoutId)
    const raceTrackId = parseInt(req.params.raceTrackId)

    try {
        const relation = await TrackLayout.createBelongsToRaceTrackRelationship(trackLayoutId, raceTrackId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.RACE_TRACK)

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
