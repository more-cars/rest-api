import express from "express"
import {RacingEvent} from "../../models/racing-events/RacingEvent"
import {marshalNode} from "./marshalling/marshalNode"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await RacingEvent.findById(nodeId)

    if (!node) {
        return sendResponse404(res)
    }

    const marshalledData = marshalNode(node)

    return sendResponse200(marshalledData, res)
}
