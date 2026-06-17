import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {CompanyInput} from "../../../models/node-types/companies/types/CompanyInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Company} from "../../../models/node-types/companies/Company"
import {convertCompanyModelNodeToControllerNode} from "./convertCompanyModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Company).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CompanyInput

    if (!validateInputData(data, NodeType.Company)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Company.create(data)
        const node = convertCompanyModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
