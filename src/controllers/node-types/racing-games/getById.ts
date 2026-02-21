import express from "express"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {convertRacingGameModelNodeToControllerNode} from "./convertRacingGameModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const modelNode = await RacingGame.findById(nodeId)

    if (!modelNode) {
        return sendResponse404(res)
    }

    const node = convertRacingGameModelNodeToControllerNode(modelNode)
    const marshalledData = marshalSingleNode(node.fields)

    return sendResponse200(marshalledData, res)
}
