import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {BookInput} from "../../../models/node-types/books/types/BookInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Book} from "../../../models/node-types/books/Book"
import {convertBookModelNodeToControllerNode} from "./convertBookModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.Book).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as BookInput

    if (!validateInputData(data, NodeType.Book, 'UPDATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Book.update(nodeId, data)
        const node = convertBookModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
