import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateLapTimeInput} from "../../../models/node-types/lap-times/types/CreateLapTimeInput"
import {validateInputData} from "../../nodes/validateInputData"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {convertLapTimeModelNodeToControllerNode} from "./convertLapTimeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.LapTime).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateLapTimeInput

    if (!validateInputData(data, NodeType.LapTime)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await LapTime.create(data)
        const node = convertLapTimeModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
