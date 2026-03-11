import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateProgrammeEpisodeInput} from "../../../models/node-types/programme-episodes/types/CreateProgrammeEpisodeInput"
import {ProgrammeEpisode} from "../../../models/node-types/programme-episodes/ProgrammeEpisode"
import {convertProgrammeEpisodeModelNodeToControllerNode} from "./convertProgrammeEpisodeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateProgrammeEpisodeRawInput} from "./types/CreateProgrammeEpisodeRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isMandatoryNumber} from "../../validators/isMandatoryNumber"
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

    const sanitizedData = sanitize(data as CreateProgrammeEpisodeInput)

    try {
        const modelNode = await ProgrammeEpisode.create(sanitizedData)
        const node = convertProgrammeEpisodeModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateProgrammeEpisodeRawInput): boolean {

    if (!isMandatoryString(data.title)) {
        return false
    }

    if (!isOptionalNumber(data.season_number)) {
        return false
    }

    if (!isOptionalNumber(data.season_episode_number)) {
        return false
    }

    if (!isOptionalString(data.original_air_date)) {
        return false
    }

    if (!isOptionalString(data.duration)) {
        return false
    }

    return true
}

export function sanitize(data: CreateProgrammeEpisodeInput): CreateProgrammeEpisodeInput {
    return {
        title: data.title.trim(),
        season_number: data.season_number ? data.season_number : null,
        season_episode_number: data.season_episode_number ? data.season_episode_number : null,
        original_air_date: data.original_air_date ? data.original_air_date.trim() : null,
        duration: data.duration ? data.duration.trim() : null,
    } satisfies CreateProgrammeEpisodeInput
}
