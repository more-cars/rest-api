import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {PriceInput} from "../../../models/node-types/prices/types/PriceInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Price} from "../../../models/node-types/prices/Price"
import {convertPriceModelNodeToControllerNode} from "./convertPriceModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.Price).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as PriceInput

    if (!validateInputData(data, NodeType.Price, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Price.update(nodeId, data)
        const node = convertPriceModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
