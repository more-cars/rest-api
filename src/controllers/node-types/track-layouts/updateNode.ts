import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {TrackLayoutInput} from "../../../models/node-types/track-layouts/types/TrackLayoutInput"
import {validateInputData} from "../../nodes/validateInputData"
import {TrackLayout} from "../../../models/node-types/track-layouts/TrackLayout"
import {convertTrackLayoutModelNodeToControllerNode} from "./convertTrackLayoutModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.TrackLayout).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as TrackLayoutInput

    if (!validateInputData(data, NodeType.TrackLayout, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await TrackLayout.update(nodeId, data)
        const node = convertTrackLayoutModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
