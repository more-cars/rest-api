import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RacingSeriesInput} from "../../../models/node-types/racing-series/types/RacingSeriesInput"
import {validateInputData} from "../../nodes/validateInputData"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {convertRacingSeriesModelNodeToControllerNode} from "./convertRacingSeriesModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.RacingSeries).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RacingSeriesInput

    if (!validateInputData(data, NodeType.RacingSeries, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingSeries.update(nodeId, data)
        const node = convertRacingSeriesModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
