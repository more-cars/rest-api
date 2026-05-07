import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateModelCarInput} from "../../../models/node-types/model-cars/types/CreateModelCarInput"
import {ModelCar} from "../../../models/node-types/model-cars/ModelCar"
import {convertModelCarModelNodeToControllerNode} from "./convertModelCarModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateModelCarRawInput} from "./types/CreateModelCarRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.ModelCar).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateModelCarInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await ModelCar.create(data)
        const node = convertModelCarModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateModelCarRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.product_code)) {
        return false
    }

    if (!isOptionalNumber(data.release_year)) {
        return false
    }

    if (!isOptionalString(data.scale)) {
        return false
    }

    if (!isOptionalString(data.series)) {
        return false
    }

    return true
}
