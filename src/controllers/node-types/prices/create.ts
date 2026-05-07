import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreatePriceInput} from "../../../models/node-types/prices/types/CreatePriceInput"
import {Price} from "../../../models/node-types/prices/Price"
import {convertPriceModelNodeToControllerNode} from "./convertPriceModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreatePriceRawInput} from "./types/CreatePriceRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isMandatoryNumber} from "../../validators/isMandatoryNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Price).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreatePriceInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Price.create(data)
        const node = convertPriceModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreatePriceRawInput): boolean {

    if (!isMandatoryNumber(data.price)) {
        return false
    }

    if (!isMandatoryNumber(data.price_year)) {
        return false
    }

    if (!isMandatoryString(data.currency_code)) {
        return false
    }

    if (!isMandatoryString(data.country_code)) {
        return false
    }

    return true
}
