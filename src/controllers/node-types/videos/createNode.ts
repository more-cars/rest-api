import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {VideoInput} from "../../../models/node-types/videos/types/VideoInput"
import {validateInputData} from "../../nodes/validateInputData"
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

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Video)
        .properties
        .filter(prop => prop.scope !== 'system')
        .map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as VideoInput

    if (!validateInputData(data, NodeType.Video)) {
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
            return sendResponse500(res)
        }
    }
}
