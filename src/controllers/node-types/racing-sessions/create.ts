import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateRacingSessionInput} from "../../../models/node-types/racing-sessions/types/CreateRacingSessionInput"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import {convertRacingSessionModelNodeToControllerNode} from "./convertRacingSessionModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateRacingSessionRawInput} from "./types/CreateRacingSessionRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RacingSession).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateRacingSessionInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingSession.create(data)
        const node = convertRacingSessionModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRacingSessionRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.start_date)) {
        return false
    }

    if (!isOptionalString(data.start_time)) {
        return false
    }

    if (!isOptionalNumber(data.duration)) {
        return false
    }

    if (!isOptionalString(data.duration_unit)) {
        return false
    }

    if (!isOptionalNumber(data.distance)) {
        return false
    }

    if (!isOptionalString(data.distance_unit)) {
        return false
    }

    return true
}
