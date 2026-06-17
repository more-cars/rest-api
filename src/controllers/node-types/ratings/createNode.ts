import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {RatingInput} from "../../../models/node-types/ratings/types/RatingInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Rating} from "../../../models/node-types/ratings/Rating"
import {convertRatingModelNodeToControllerNode} from "./convertRatingModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Rating).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as RatingInput

    if (!validateInputData(data, NodeType.Rating)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Rating.create(data)
        const node = convertRatingModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
