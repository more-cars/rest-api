import express from "express"
import {getNamesOfAllNodeProperties} from "../../../specification/getNamesOfAllNodeProperties"
import {NodeType} from "../../../specification/NodeType"
import {extractCollectionConstraintParameters} from "../../nodes/extractCollectionConstraintParameters"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {convertRacingEventModelNodeToControllerNode} from "./convertRacingEventModelNodeToControllerNode"
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
        const availableProperties = getNamesOfAllNodeProperties(NodeType.RacingEvent)
        const params = extractCollectionConstraintParameters(req, availableProperties)
        const modelNodes = await RacingEvent.findAll(params)
        const nodes = modelNodes.map(node => convertRacingEventModelNodeToControllerNode(node))
        const totalAmount = await Node.getTotalAmount(mapControllerNodeTypeToModelNodeType(ControllerNodeType.RacingEvent))
        const marshalledData = marshalNodeCollection(nodes, {total: totalAmount})

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof InvalidPaginationParams || e instanceof InvalidSortingParams || e instanceof InvalidFilterParams) {
            console.error(e)
            return sendResponse400(res)
        }

        console.error(e)
        return sendResponse500(res)
    }
}
