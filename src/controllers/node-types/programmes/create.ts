import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateProgrammeInput} from "../../../models/node-types/programmes/types/CreateProgrammeInput"
import {Programme} from "../../../models/node-types/programmes/Programme"
import {convertProgrammeModelNodeToControllerNode} from "./convertProgrammeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateProgrammeRawInput} from "./types/CreateProgrammeRawInput"
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

    const sanitizedData = sanitize(data as CreateProgrammeInput)

    try {
        const modelNode = await Programme.create(sanitizedData)
        const node = convertProgrammeModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateProgrammeRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.aired_from_year)) {
        return false
    }

    if (!isOptionalNumber(data.aired_until_year)) {
        return false
    }

    if (!isOptionalString(data.channel)) {
        return false
    }

    if (!isOptionalNumber(data.total_seasons)) {
        return false
    }

    if (!isOptionalNumber(data.total_episodes)) {
        return false
    }

    if (!isOptionalString(data.regular_episode_running_time)) {
        return false
    }

    if (!isOptionalString(data.country_code)) {
        return false
    }

    return true
}

export function sanitize(data: CreateProgrammeInput): CreateProgrammeInput {
    return {
        name: data.name.trim(),
        aired_from_year: data.aired_from_year ? data.aired_from_year : null,
        aired_until_year: data.aired_until_year ? data.aired_until_year : null,
        channel: data.channel ? data.channel.trim() : null,
        total_seasons: data.total_seasons ? data.total_seasons : null,
        total_episodes: data.total_episodes ? data.total_episodes : null,
        regular_episode_running_time: data.regular_episode_running_time ? data.regular_episode_running_time.trim() : null,
        country_code: data.country_code ? data.country_code.trim() : null,
    } satisfies CreateProgrammeInput
}
