import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateImageInput} from "../../../models/node-types/images/types/CreateImageInput"
import {Image} from "../../../models/node-types/images/Image"
import {convertImageModelNodeToControllerNode} from "./convertImageModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateImageRawInput} from "./types/CreateImageRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isValidImagePlatform} from "../../validators/isValidImagePlatform"
import {FlickrImageAlreadyExistsError} from "../../../models/types/FlickrImageAlreadyExistsError"
import {WikimediaImageAlreadyExistsError} from "../../../models/types/WikimediaImageAlreadyExistsError"
import {FlickrImageNotFoundError} from "../../../models/types/FlickrImageNotFoundError"
import {WikimediaImageNotFoundError} from "../../../models/types/WikimediaImageNotFoundError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse409} from "../../responses/sendResponse409"
import {sendResponse422} from "../../responses/sendResponse422"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateImageInput)

    try {
        const modelNode = await Image.create(sanitizedData)
        const node = convertImageModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof WikimediaImageNotFoundError || e instanceof FlickrImageNotFoundError) {
            return sendResponse422(res)
        } else if (e instanceof WikimediaImageAlreadyExistsError || e instanceof FlickrImageAlreadyExistsError) {
            return sendResponse409(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}

export function validate(data: CreateImageRawInput): boolean {
    if (!isValidImagePlatform(data.image_provider)) {
        return false
    }

    if (!isMandatoryString(data.image_provider)) {
        return false
    }

    if (!isMandatoryString(data.external_id)) {
        return false
    }

    return true
}

export function sanitize(data: CreateImageInput): CreateImageInput {
    return {
        image_provider: data.image_provider.trim(),
        external_id: data.external_id.trim(),
    } satisfies CreateImageInput
}
