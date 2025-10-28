import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateLapTimeInput} from "../../models/lap-times/types/CreateLapTimeInput"
import {LapTime} from "../../models/lap-times/LapTime"
import type {CreateLapTimeRawInput} from "./types/CreateLapTimeRawInput"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateLapTimeInput)

    try {
        const createdNode = await LapTime.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateLapTimeRawInput): boolean {
    if (!isMandatoryString(data.time)) {
        return false
    }

    if (!isMandatoryString(data.driver_name)) {
        return false
    }

    if (!isOptionalString(data.date)) {
        return false
    }

    return true
}

export function sanitize(data: CreateLapTimeInput): CreateLapTimeInput {
    return {
        time: data.time.trim(),
        driver_name: data.driver_name.trim(),
        date: data.date ? data.date.trim() : null,
    } as CreateLapTimeInput
}
