import express from "express"
import {Node} from "../../models/Node"
import {marshalSingleNode} from "./marshalSingleNode"
import {convertModelNodeToControllerNode} from "./convertModelNodeToControllerNode"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        const node = await Node.findById(nodeId)
        const marshalledData = marshalSingleNode(convertModelNodeToControllerNode(node))

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
