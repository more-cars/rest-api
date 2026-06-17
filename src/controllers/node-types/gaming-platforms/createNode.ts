import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {GamingPlatformInput} from "../../../models/node-types/gaming-platforms/types/GamingPlatformInput"
import {validateInputData} from "../../nodes/validateInputData"
import {GamingPlatform} from "../../../models/node-types/gaming-platforms/GamingPlatform"
import {convertGamingPlatformModelNodeToControllerNode} from "./convertGamingPlatformModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.GamingPlatform).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as GamingPlatformInput

    if (!validateInputData(data, NodeType.GamingPlatform)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await GamingPlatform.create(data)
        const node = convertGamingPlatformModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
