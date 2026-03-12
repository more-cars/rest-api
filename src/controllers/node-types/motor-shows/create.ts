import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateMotorShowInput} from "../../../models/node-types/motor-shows/types/CreateMotorShowInput"
import {MotorShow} from "../../../models/node-types/motor-shows/MotorShow"
import {convertMotorShowModelNodeToControllerNode} from "./convertMotorShowModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateMotorShowRawInput} from "./types/CreateMotorShowRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateMotorShowInput)

    try {
        const modelNode = await MotorShow.create(sanitizedData)
        const node = convertMotorShowModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateMotorShowRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.date_from)) {
        return false
    }

    if (!isOptionalString(data.date_until)) {
        return false
    }

    if (!isOptionalString(data.location)) {
        return false
    }

    if (!isOptionalString(data.target_audience)) {
        return false
    }

    if (!isOptionalString(data.focus)) {
        return false
    }

    return true
}

export function sanitize(data: CreateMotorShowInput): CreateMotorShowInput {
    return {
        name: data.name.trim(),
        date_from: data.date_from ? data.date_from.trim() : null,
        date_until: data.date_until ? data.date_until.trim() : null,
        location: data.location ? data.location.trim() : null,
        target_audience: data.target_audience ? data.target_audience.trim() : null,
        focus: data.focus ? data.focus.trim() : null,
    } satisfies CreateMotorShowInput
}
