import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {MagazineIssueInput} from "../../../models/node-types/magazine-issues/types/MagazineIssueInput"
import {validateInputData} from "../../nodes/validateInputData"
import {MagazineIssue} from "../../../models/node-types/magazine-issues/MagazineIssue"
import {convertMagazineIssueModelNodeToControllerNode} from "./convertMagazineIssueModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.MagazineIssue).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as MagazineIssueInput

    if (!validateInputData(data, NodeType.MagazineIssue, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await MagazineIssue.update(nodeId, data)
        const node = convertMagazineIssueModelNodeToControllerNode(modelNode)
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
