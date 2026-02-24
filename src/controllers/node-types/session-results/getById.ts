import express from "express"
import {SessionResult} from "../../../models/node-types/session-results/SessionResult"
import {convertSessionResultModelNodeToControllerNode} from "./convertSessionResultModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        const modelNode = await SessionResult.findById(nodeId)
        const node = convertSessionResultModelNodeToControllerNode(modelNode)
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
