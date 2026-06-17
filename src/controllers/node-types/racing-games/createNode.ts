import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RacingGameInput} from "../../../models/node-types/racing-games/types/RacingGameInput"
import {validateInputData} from "../../nodes/validateInputData"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {convertRacingGameModelNodeToControllerNode} from "./convertRacingGameModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RacingGame).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RacingGameInput

    if (!validateInputData(data, NodeType.RacingGame)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingGame.create(data)
        const node = convertRacingGameModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
