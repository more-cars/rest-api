import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {ProgrammeInput} from "../../../models/node-types/programmes/types/ProgrammeInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Programme} from "../../../models/node-types/programmes/Programme"
import {convertProgrammeModelNodeToControllerNode} from "./convertProgrammeModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Programme).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as ProgrammeInput

    if (!validateInputData(data, NodeType.Programme)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Programme.create(data)
        const node = convertProgrammeModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
