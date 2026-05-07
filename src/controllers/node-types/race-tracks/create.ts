import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateRaceTrackInput} from "../../../models/node-types/race-tracks/types/CreateRaceTrackInput"
import {RaceTrack} from "../../../models/node-types/race-tracks/RaceTrack"
import {convertRaceTrackModelNodeToControllerNode} from "./convertRaceTrackModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateRaceTrackRawInput} from "./types/CreateRaceTrackRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RaceTrack).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateRaceTrackInput

    if (!validate(data)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RaceTrack.create(data)
        const node = convertRaceTrackModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

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

    if (!isOptionalString(data.country_code)) {
        return false
    }

    return true
}
