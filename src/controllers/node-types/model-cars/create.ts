import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
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
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateModelCarInput)

    try {
        const modelNode = await ModelCar.create(sanitizedData)
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

export function sanitize(data: CreateModelCarInput): CreateModelCarInput {
    return {
        name: data.name.trim(),
        product_code: data.product_code ? data.product_code.trim() : null,
        release_year: data.release_year ? data.release_year : null,
        scale: data.scale ? data.scale.trim() : null,
        series: data.series ? data.series.trim() : null,
    } satisfies CreateModelCarInput
}
