import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateCarModelInput} from "../../../models/node-types/car-models/types/CreateCarModelInput"
import {CarModel} from "../../../models/node-types/car-models/CarModel"
import {convertCarModelModelNodeToControllerNode} from "./convertCarModelModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.CarModel).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateCarModelInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await CarModel.create(data)
        const node = convertCarModelModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)
        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateCarModelRawInput): boolean {
    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.built_from)) {
        return false
    }

    if (!isOptionalNumber(data.built_to)) {
        return false
    }

    if (!isOptionalNumber(data.generation)) {
        return false
    }

    if (!isOptionalString(data.internal_code)) {
        return false
    }

    if (!isOptionalNumber(data.total_production)) {
        return false
    }

    return true
}
