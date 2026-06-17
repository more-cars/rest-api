import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {ModelCarBrandInput} from "../../../models/node-types/model-car-brands/types/ModelCarBrandInput"
import {validateInputData} from "../../nodes/validateInputData"
import {ModelCarBrand} from "../../../models/node-types/model-car-brands/ModelCarBrand"
import {convertModelCarBrandModelNodeToControllerNode} from "./convertModelCarBrandModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.ModelCarBrand).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as ModelCarBrandInput

    if (!validateInputData(data, NodeType.ModelCarBrand)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await ModelCarBrand.create(data)
        const node = convertModelCarBrandModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
