import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateRacingSessionInput} from "../../../models/node-types/racing-sessions/types/CreateRacingSessionInput"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import type {CreateRacingSessionRawInput} from "./types/CreateRacingSessionRawInput"
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

    const sanitizedData = sanitize(data as CreateRacingSessionInput)

    try {
        const createdNode = await RacingSession.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRacingSessionRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.start_date)) {
        return false
    }

    if (!isOptionalString(data.start_time)) {
        return false
    }

    if (!isOptionalNumber(data.duration)) {
        return false
    }

    if (!isOptionalString(data.duration_unit)) {
        return false
    }

    if (!isOptionalNumber(data.distance)) {
        return false
    }

    if (!isOptionalString(data.distance_unit)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRacingSessionInput): CreateRacingSessionInput {
    return {
        name: data.name.trim(),
        start_date: data.start_date ? data.start_date.trim() : null,
        start_time: data.start_time ? data.start_time.trim() : null,
        duration: data.duration ? data.duration : null,
        duration_unit: data.duration_unit ? data.duration_unit.trim() : null,
        distance: data.distance ? data.distance : null,
        distance_unit: data.distance_unit ? data.distance_unit.trim() : null,
    } as CreateRacingSessionInput
}
