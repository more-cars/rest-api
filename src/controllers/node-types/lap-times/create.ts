import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateLapTimeInput} from "../../../models/node-types/lap-times/types/CreateLapTimeInput"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {convertLapTimeModelNodeToControllerNode} from "./convertLapTimeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateLapTimeRawInput} from "./types/CreateLapTimeRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.LapTime).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateLapTimeInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await LapTime.create(data)
        const node = convertLapTimeModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateLapTimeRawInput): boolean {
    if (!isMandatoryString(data.time)) {
        return false
    }

    if (!isMandatoryString(data.driver_name)) {
        return false
    }

    if (!isOptionalString(data.date)) {
        return false
    }

    return true
}
