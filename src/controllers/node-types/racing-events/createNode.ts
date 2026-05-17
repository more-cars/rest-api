import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RacingEventInput} from "../../../models/node-types/racing-events/types/RacingEventInput"
import {validateInputData} from "../../nodes/validateInputData"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {convertRacingEventModelNodeToControllerNode} from "./convertRacingEventModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RacingEvent).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RacingEventInput

    if (!validateInputData(data, NodeType.RacingEvent)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingEvent.create(data)
        const node = convertRacingEventModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
