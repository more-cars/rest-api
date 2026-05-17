import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RacingSeriesInput} from "../../../models/node-types/racing-series/types/RacingSeriesInput"
import {validateInputData} from "../../nodes/validateInputData"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {convertRacingSeriesModelNodeToControllerNode} from "./convertRacingSeriesModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.RacingSeries).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RacingSeriesInput

    if (!validateInputData(data, NodeType.RacingSeries)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await RacingSeries.create(data)
        const node = convertRacingSeriesModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
