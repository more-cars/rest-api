import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateGamingPlatformInput} from "../../../models/gaming-platforms/types/CreateGamingPlatformInput"
import {GamingPlatform} from "../../../models/gaming-platforms/GamingPlatform"
import type {CreateGamingPlatformRawInput} from "./types/CreateGamingPlatformRawInput"
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

    const sanitizedData = sanitize(data as CreateGamingPlatformInput)

    try {
        const createdNode = await GamingPlatform.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateGamingPlatformRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.release_year)) {
        return false
    }

    if (!isOptionalString(data.manufacturer)) {
        return false
    }

    return true
}

export function sanitize(data: CreateGamingPlatformInput): CreateGamingPlatformInput {
    return {
        name: data.name.trim(),
        release_year: data.release_year ? data.release_year : null,
        manufacturer: data.manufacturer ? data.manufacturer.trim() : null,
    } as CreateGamingPlatformInput
}
