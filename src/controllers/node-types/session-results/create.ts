import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateSessionResultInput} from "../../../models/node-types/session-results/types/CreateSessionResultInput"
import {SessionResult} from "../../../models/node-types/session-results/SessionResult"
import {convertSessionResultModelNodeToControllerNode} from "./convertSessionResultModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateSessionResultRawInput} from "./types/CreateSessionResultRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isMandatoryNumber} from "../../validators/isMandatoryNumber"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.SessionResult).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateSessionResultInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await SessionResult.create(data)
        const node = convertSessionResultModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateSessionResultRawInput): boolean {

    if (!isMandatoryNumber(data.position)) {
        return false
    }

    if (!isOptionalString(data.race_number)) {
        return false
    }

    if (!isMandatoryString(data.driver_name)) {
        return false
    }

    if (!isOptionalString(data.team_name)) {
        return false
    }

    if (!isOptionalString(data.race_time)) {
        return false
    }

    if (!isOptionalNumber(data.laps)) {
        return false
    }

    if (!isOptionalString(data.status)) {
        return false
    }

    if (!isOptionalNumber(data.points)) {
        return false
    }

    return true
}
