import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateBrandInput} from "../../../models/node-types/brands/types/CreateBrandInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Brand} from "../../../models/node-types/brands/Brand"
import {convertBrandModelNodeToControllerNode} from "./convertBrandModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Brand).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateBrandInput

    if (!validateInputData(data, NodeType.Brand)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Brand.create(data)
        const node = convertBrandModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
