import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateRacingEventInput} from "../../../models/racing-events/types/CreateRacingEventInput"
import {RacingEvent} from "../../../models/racing-events/RacingEvent"
import type {CreateRacingEventRawInput} from "./types/CreateRacingEventRawInput"
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

    const sanitizedData = sanitize(data as CreateRacingEventInput)

    try {
        const createdNode = await RacingEvent.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRacingEventRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.round)) {
        return false
    }

    if (!isOptionalString(data.date_from)) {
        return false
    }

    if (!isOptionalString(data.date_to)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRacingEventInput): CreateRacingEventInput {
    return {
        name: data.name.trim(),
        round: data.round ? data.round : null,
        date_from: data.date_from ? data.date_from.trim() : null,
        date_to: data.date_to ? data.date_to.trim() : null,
    } as CreateRacingEventInput
}
