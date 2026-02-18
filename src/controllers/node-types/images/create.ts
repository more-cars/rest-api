import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateImageInput} from "../../../models/node-types/images/types/CreateImageInput"
import {Image} from "../../../models/node-types/images/Image"
import type {CreateImageRawInput} from "./types/CreateImageRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateImageInput)

    try {
        const createdNode = await Image.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateImageRawInput): boolean {
    if (!isMandatoryString(data.external_id)) {
        return false
    }

    if (!isMandatoryString(data.image_provider)) {
        return false
    }

    return true
}

export function sanitize(data: CreateImageInput): CreateImageInput {
    return {
        external_id: data.external_id.trim(),
        image_provider: data.image_provider.trim(),
    } as CreateImageInput
}
