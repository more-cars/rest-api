import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateTrackLayoutInput} from "../../../models/node-types/track-layouts/types/CreateTrackLayoutInput"
import {validateInputData} from "../../nodes/validateInputData"
import {TrackLayout} from "../../../models/node-types/track-layouts/TrackLayout"
import {convertTrackLayoutModelNodeToControllerNode} from "./convertTrackLayoutModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.TrackLayout).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateTrackLayoutInput

    if (!validateInputData(data, NodeType.TrackLayout)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await TrackLayout.create(data)
        const node = convertTrackLayoutModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
