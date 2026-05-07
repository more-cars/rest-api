import express from "express"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateVideoInput} from "../../../models/node-types/videos/types/CreateVideoInput"
import {validateInputData} from "../../nodes/validateInputData"
import {NodeType} from "../../../specification/NodeType"
import {Video} from "../../../models/node-types/videos/Video"
import {convertVideoModelNodeToControllerNode} from "./convertVideoModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {YouTubeVideoNotFoundError} from "../../../models/types/YouTubeVideoNotFoundError"
import {YouTubeVideoAlreadyExistsError} from "../../../models/types/YouTubeVideoAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse409} from "../../responses/sendResponse409"
import {sendResponse422} from "../../responses/sendResponse422"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body, ['video_provider', 'external_id']) as CreateVideoInput

    if (!validateInputData(data, NodeType.Video, ['video_provider', 'external_id'])) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Video.create(data)
        const node = convertVideoModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof YouTubeVideoNotFoundError) {
            return sendResponse422(res)
        } else if (e instanceof YouTubeVideoAlreadyExistsError) {
            return sendResponse409(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
