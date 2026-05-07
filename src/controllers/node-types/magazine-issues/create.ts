import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateMagazineIssueInput} from "../../../models/node-types/magazine-issues/types/CreateMagazineIssueInput"
import {validateInputData} from "../../nodes/validateInputData"
import {MagazineIssue} from "../../../models/node-types/magazine-issues/MagazineIssue"
import {convertMagazineIssueModelNodeToControllerNode} from "./convertMagazineIssueModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.MagazineIssue).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateMagazineIssueInput

    if (!validateInputData(data, NodeType.MagazineIssue)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await MagazineIssue.create(data)
        const node = convertMagazineIssueModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
