import express from "express"
import {SessionResult} from "../../../models/node-types/session-results/SessionResult"
import {convertSessionResultModelNodeToControllerNode} from "./convertSessionResultModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const modelNode = await SessionResult.findById(nodeId)

    if (!modelNode) {
        return sendResponse404(res)
    }

    const node = convertSessionResultModelNodeToControllerNode(modelNode)
    const marshalledData = marshalSingleNode(node.fields)

    return sendResponse200(marshalledData, res)
}
