import express from "express"
import {TrackLayout} from "../../../models/track-layouts/TrackLayout"
import {marshalRelations} from "../../relationships/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasLapTimeRelations(req: express.Request, res: express.Response) {
    const trackLayoutId = parseInt(req.params.trackLayoutId)

    try {
        const relations = await TrackLayout.getAllHasLapTimeRelationships(trackLayoutId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.LAP_TIME)

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
