import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
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

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateModelCarBrandInput)

    try {
        const modelNode = await ModelCarBrand.create(sanitizedData)
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

    return true
}

export function sanitize(data: CreateModelCarBrandInput): CreateModelCarBrandInput {
    return {
        name: data.name.trim(),
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
    } satisfies CreateModelCarBrandInput
}
