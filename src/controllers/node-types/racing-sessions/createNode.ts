import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RacingSessionInput} from "../../../models/node-types/racing-sessions/types/RacingSessionInput"
import {validateInputData} from "../../nodes/validateInputData"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import {convertRacingSessionModelNodeToControllerNode} from "./convertRacingSessionModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RacingSession).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RacingSessionInput

    if (!validateInputData(data, NodeType.RacingSession)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingSession.create(data)
        const node = convertRacingSessionModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
