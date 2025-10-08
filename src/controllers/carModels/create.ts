import express from "express"
import {unmarshal} from "./unmarshal"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateCarModelInput} from "../../models/car-models/types/CreateCarModelInput"
import {CarModel} from "../../models/car-models/CarModel"
import {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {sendResponse500} from "../responses/sendResponse500"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"
import {isOptionalNumber} from "../validators/isOptionalNumber"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshal(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateCarModelInput)

    try {
        const createdNode: CarModelNode = await CarModel.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)
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

export function sanitize(data: CreateCarModelInput): CreateCarModelInput {
    return {
        name: data.name.trim(),
        built_from: data.built_from ? data.built_from : null,
        built_to: data.built_to ? data.built_to : null,
        generation: data.generation ? data.generation : null,
        internal_code: data.internal_code ? data.internal_code.trim() : null,
        total_production: data.total_production ? data.total_production : null,
    } as CreateCarModelInput
}
