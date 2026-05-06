import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateModelCarBrandInput} from "../../../models/node-types/model-car-brands/types/CreateModelCarBrandInput"
import {ModelCarBrand} from "../../../models/node-types/model-car-brands/ModelCarBrand"
import {convertModelCarBrandModelNodeToControllerNode} from "./convertModelCarBrandModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateModelCarBrandRawInput} from "./types/CreateModelCarBrandRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"
import {isOptionalString} from "../../validators/isOptionalString"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.ModelCarBrand).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateModelCarBrandInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await ModelCarBrand.create(data)
        const node = convertModelCarBrandModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateModelCarBrandRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.founded)) {
        return false
    }

    if (!isOptionalNumber(data.defunct)) {
        return false
    }

    if (!isOptionalString(data.country_code)) {
        return false
    }

    return true
}
