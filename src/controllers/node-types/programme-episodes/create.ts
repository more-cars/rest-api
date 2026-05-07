import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateProgrammeEpisodeInput} from "../../../models/node-types/programme-episodes/types/CreateProgrammeEpisodeInput"
import {ProgrammeEpisode} from "../../../models/node-types/programme-episodes/ProgrammeEpisode"
import {convertProgrammeEpisodeModelNodeToControllerNode} from "./convertProgrammeEpisodeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateProgrammeEpisodeRawInput} from "./types/CreateProgrammeEpisodeRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.ProgrammeEpisode).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateProgrammeEpisodeInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await ProgrammeEpisode.create(data)
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
