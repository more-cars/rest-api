import express from "express"
import {RacingSeries} from "../../../models/racing-series/RacingSeries"
import {marshalRelations} from "../../relationships/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const racingSeriesId = parseInt(req.params.racingSeriesId)

    try {
        const relations = await RacingSeries.getAllHasImageRelationships(racingSeriesId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.IMAGE)

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
