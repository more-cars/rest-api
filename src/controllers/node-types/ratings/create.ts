import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateRatingInput} from "../../../models/node-types/ratings/types/CreateRatingInput"
import {Rating} from "../../../models/node-types/ratings/Rating"
import {convertRatingModelNodeToControllerNode} from "./convertRatingModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateRatingRawInput} from "./types/CreateRatingRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isMandatoryNumber} from "../../validators/isMandatoryNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateRatingInput)

    try {
        const modelNode = await Rating.create(sanitizedData)
        const node = convertRatingModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRatingRawInput): boolean {

    if (!isMandatoryNumber(data.rating_value)) {
        return false
    }

    if (!isMandatoryNumber(data.scale_minimum)) {
        return false
    }

    if (!isMandatoryNumber(data.scale_maximum)) {
        return false
    }

    if (!isMandatoryString(data.scale_direction)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRatingInput): CreateRatingInput {
    return {
        rating_value: data.rating_value,
        scale_minimum: data.scale_minimum,
        scale_maximum: data.scale_maximum,
        scale_direction: data.scale_direction.trim(),
    } satisfies CreateRatingInput
}
