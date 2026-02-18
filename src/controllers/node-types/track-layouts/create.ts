import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateTrackLayoutInput} from "../../../models/track-layouts/types/CreateTrackLayoutInput"
import {TrackLayout} from "../../../models/track-layouts/TrackLayout"
import type {CreateTrackLayoutRawInput} from "./types/CreateTrackLayoutRawInput"
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

    const sanitizedData = sanitize(data as CreateTrackLayoutInput)

    try {
        const createdNode = await TrackLayout.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateTrackLayoutRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.year_from)) {
        return false
    }

    if (!isOptionalNumber(data.year_to)) {
        return false
    }

    if (!isOptionalNumber(data.length)) {
        return false
    }

    if (!isOptionalString(data.length_unit)) {
        return false
    }

    if (!isOptionalString(data.direction)) {
        return false
    }

    if (!isOptionalNumber(data.elevation_change)) {
        return false
    }

    if (!isOptionalString(data.elevation_change_unit)) {
        return false
    }

    if (!isOptionalString(data.surface)) {
        return false
    }

    return true
}

export function sanitize(data: CreateTrackLayoutInput): CreateTrackLayoutInput {
    return {
        name: data.name.trim(),
        year_from: data.year_from ? data.year_from : null,
        year_to: data.year_to ? data.year_to : null,
        length: data.length ? data.length : null,
        length_unit: data.length_unit ? data.length_unit.trim() : null,
        direction: data.direction ? data.direction.trim() : null,
        elevation_change: data.elevation_change ? data.elevation_change : null,
        elevation_change_unit: data.elevation_change_unit ? data.elevation_change_unit.trim() : null,
        surface: data.surface ? data.surface.trim() : null,
    } as CreateTrackLayoutInput
}
