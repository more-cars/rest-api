import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateSessionResultInput} from "../../models/session-results/types/CreateSessionResultInput"
import {SessionResult} from "../../models/session-results/SessionResult"
import type {CreateSessionResultRawInput} from "./types/CreateSessionResultRawInput"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isMandatoryNumber} from "../validators/isMandatoryNumber"
import {isOptionalNumber} from "../validators/isOptionalNumber"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateSessionResultInput)

    try {
        const createdNode = await SessionResult.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateSessionResultRawInput): boolean {

    if (!isMandatoryNumber(data.position)) {
        return false
    }

    if (!isOptionalString(data.race_number)) {
        return false
    }

    if (!isMandatoryString(data.driver_name)) {
        return false
    }

    if (!isOptionalString(data.team_name)) {
        return false
    }

    if (!isOptionalString(data.race_time)) {
        return false
    }

    if (!isOptionalNumber(data.laps)) {
        return false
    }

    if (!isOptionalString(data.status)) {
        return false
    }

    if (!isOptionalNumber(data.points)) {
        return false
    }

    return true
}

export function sanitize(data: CreateSessionResultInput): CreateSessionResultInput {
    return {
        position: data.position,
        race_number: data.race_number ? data.race_number.trim() : null,
        driver_name: data.driver_name.trim(),
        team_name: data.team_name ? data.team_name.trim() : null,
        race_time: data.race_time ? data.race_time.trim() : null,
        laps: data.laps ? data.laps : null,
        status: data.status ? data.status.trim() : null,
        points: data.points ? data.points : null,
    } as CreateSessionResultInput
}
