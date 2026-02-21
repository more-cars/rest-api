import express from "express"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {convertRacingEventModelNodeToControllerNode} from "./convertRacingEventModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const modelNode = await RacingEvent.findById(nodeId)

    if (!modelNode) {
        return sendResponse404(res)
    }

    const node = convertRacingEventModelNodeToControllerNode(modelNode)
    const marshalledData = marshalSingleNode(node.fields)

    return sendResponse200(marshalledData, res)
}
