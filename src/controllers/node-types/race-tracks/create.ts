import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateRaceTrackInput} from "../../../models/node-types/race-tracks/types/CreateRaceTrackInput"
import {RaceTrack} from "../../../models/node-types/race-tracks/RaceTrack"
import type {CreateRaceTrackRawInput} from "./types/CreateRaceTrackRawInput"
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

    const sanitizedData = sanitize(data as CreateRaceTrackInput)

    try {
        const createdNode = await RaceTrack.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRaceTrackRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.opened)) {
        return false
    }

    if (!isOptionalNumber(data.closed)) {
        return false
    }

    if (!isOptionalString(data.type)) {
        return false
    }

    if (!isOptionalString(data.location)) {
        return false
    }

    if (!isOptionalString(data.geo_position)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRaceTrackInput): CreateRaceTrackInput {
    return {
        name: data.name.trim(),
        opened: data.opened ? data.opened : null,
        closed: data.closed ? data.closed : null,
        type: data.type ? data.type.trim() : null,
        location: data.location ? data.location.trim() : null,
        geo_position: data.geo_position ? data.geo_position.trim() : null,
    } as CreateRaceTrackInput
}
