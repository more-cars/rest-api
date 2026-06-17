---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll.ts
---
import express from "express"
import {extractCollectionConstraintParameters} from "../../nodes/extractCollectionConstraintParameters"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "./convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"
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
        const params = extractCollectionConstraintParameters(req, getNodeTypeSpecification(NodeType.<%= h.changeCase.pascal(nodeType) %>))
        const modelNodes = await <%= h.changeCase.pascal(nodeType) %>.findAll(params)
        const nodes = modelNodes.map(node => convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(node))
        const totalAmount = await Node.getTotalAmount(mapControllerNodeTypeToModelNodeType(ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>), params)
        const marshalledData = marshalNodeCollection(ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>, nodes, params, totalAmount)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof InvalidPaginationParams || e instanceof InvalidSortingParams || e instanceof InvalidFilterParams) {
            return sendResponse400(res)
        }

        return sendResponse500(res)
    }
}
