import express from "express"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {convertRacingSeriesModelNodeToControllerNode} from "./convertRacingSeriesModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        const modelNode = await RacingSeries.findById(nodeId)
        const node = convertRacingSeriesModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

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
