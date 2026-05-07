import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateMotorShowInput} from "../../../models/node-types/motor-shows/types/CreateMotorShowInput"
import {MotorShow} from "../../../models/node-types/motor-shows/MotorShow"
import {convertMotorShowModelNodeToControllerNode} from "./convertMotorShowModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateMotorShowRawInput} from "./types/CreateMotorShowRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Magazine).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateMotorShowInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await MotorShow.create(data)
        const node = convertMotorShowModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateMotorShowRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.date_from)) {
        return false
    }

    if (!isOptionalString(data.date_until)) {
        return false
    }

    if (!isOptionalString(data.location)) {
        return false
    }

    if (!isOptionalString(data.target_audience)) {
        return false
    }

    if (!isOptionalString(data.focus)) {
        return false
    }

    if (!isOptionalString(data.country_code)) {
        return false
    }
    return true
}
