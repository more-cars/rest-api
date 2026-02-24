import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateRacingSeriesInput} from "../../../models/node-types/racing-series/types/CreateRacingSeriesInput"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {convertRacingSeriesModelNodeToControllerNode} from "./convertRacingSeriesModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateRacingSeriesRawInput} from "./types/CreateRacingSeriesRawInput"
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

    const sanitizedData = sanitize(data as CreateRacingSeriesInput)

    try {
        const modelNode = await RacingSeries.create(sanitizedData)
        const node = convertRacingSeriesModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRacingSeriesRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.short_name)) {
        return false
    }

    if (!isOptionalNumber(data.founded)) {
        return false
    }

    if (!isOptionalNumber(data.defunct)) {
        return false
    }

    if (!isOptionalString(data.organized_by)) {
        return false
    }

    if (!isOptionalString(data.vehicle_type)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRacingSeriesInput): CreateRacingSeriesInput {
    return {
        name: data.name.trim(),
        short_name: data.short_name ? data.short_name.trim() : null,
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
        organized_by: data.organized_by ? data.organized_by.trim() : null,
        vehicle_type: data.vehicle_type ? data.vehicle_type.trim() : null,
    } satisfies CreateRacingSeriesInput
}
