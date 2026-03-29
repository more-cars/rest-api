import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateVideoInput} from "../../../models/node-types/videos/types/CreateVideoInput"
import {Video} from "../../../models/node-types/videos/Video"
import {convertVideoModelNodeToControllerNode} from "./convertVideoModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateVideoRawInput} from "./types/CreateVideoRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateVideoInput)

    try {
        const modelNode = await Video.create(sanitizedData)
        const node = convertVideoModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateVideoRawInput): boolean {

    if (!isMandatoryString(data.video_provider)) {
        return false
    }

    if (!isMandatoryString(data.external_id)) {
        return false
    }

    return true
}

export function sanitize(data: CreateVideoInput): CreateVideoInput {
    return {
        video_provider: data.video_provider.trim(),
        external_id: data.external_id.trim(),
    } satisfies CreateVideoInput
}
