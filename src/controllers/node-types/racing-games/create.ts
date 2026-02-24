import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateRacingGameInput} from "../../../models/node-types/racing-games/types/CreateRacingGameInput"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {convertRacingGameModelNodeToControllerNode} from "./convertRacingGameModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateRacingGameRawInput} from "./types/CreateRacingGameRawInput"
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

    const sanitizedData = sanitize(data as CreateRacingGameInput)

    try {
        const modelNode = await RacingGame.create(sanitizedData)
        const node = convertRacingGameModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateRacingGameRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.release_year)) {
        return false
    }

    if (!isOptionalString(data.developer)) {
        return false
    }

    if (!isOptionalString(data.publisher)) {
        return false
    }

    return true
}

export function sanitize(data: CreateRacingGameInput): CreateRacingGameInput {
    return {
        name: data.name.trim(),
        release_year: data.release_year ? data.release_year : null,
        developer: data.developer ? data.developer.trim() : null,
        publisher: data.publisher ? data.publisher.trim() : null,
    } satisfies CreateRacingGameInput
}
