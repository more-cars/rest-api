import express from "express"
import {TrackLayout} from "../../../models/node-types/track-layouts/TrackLayout"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllWasUsedByRacingEventRelations(req: express.Request, res: express.Response) {
    const trackLayoutId = parseInt(req.params.trackLayoutId)

    try {
        const relations = await TrackLayout.getAllWasUsedByRacingEventRelationships(trackLayoutId)
        const marshalledData = marshalRelations(relations, ControllerNodeType.RacingEvent)

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
