import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {ProgrammeInput} from "../../../models/node-types/programmes/types/ProgrammeInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Programme} from "../../../models/node-types/programmes/Programme"
import {convertProgrammeModelNodeToControllerNode} from "./convertProgrammeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.Programme).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as ProgrammeInput

    if (!validateInputData(data, NodeType.Programme, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Programme.update(nodeId, data)
        const node = convertProgrammeModelNodeToControllerNode(modelNode)
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
