import express from "express"
import {extractCollectionConstraintParameters} from "../../nodes/extractCollectionConstraintParameters"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {GamingPlatform} from "../../../models/node-types/gaming-platforms/GamingPlatform"
import {convertGamingPlatformModelNodeToControllerNode} from "./convertGamingPlatformModelNodeToControllerNode"
import {Node} from "../../../models/Node"
import {mapControllerNodeTypeToModelNodeType} from "../../nodes/mapControllerNodeTypeToModelNodeType"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"
import {InvalidPaginationParams} from "../../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../../models/types/InvalidFilterParams"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAll(req: express.Request, res: express.Response) {
    try {
        const params = extractCollectionConstraintParameters(req, getNodeTypeSpecification(NodeType.GamingPlatform))
        const modelNodes = await GamingPlatform.findAll(params)
        const nodes = modelNodes.map(node => convertGamingPlatformModelNodeToControllerNode(node))
        const totalAmount = await Node.getTotalAmount(mapControllerNodeTypeToModelNodeType(ControllerNodeType.GamingPlatform), params)
        const marshalledData = marshalNodeCollection(ControllerNodeType.GamingPlatform, nodes, params, totalAmount)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof InvalidPaginationParams || e instanceof InvalidSortingParams || e instanceof InvalidFilterParams) {
            return sendResponse400(res)
        }

        return sendResponse500(res)
    }
}
