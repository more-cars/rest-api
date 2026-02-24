import express from "express"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import {convertCarModelVariantModelNodeToControllerNode} from "./convertCarModelVariantModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        const modelNode = await CarModelVariant.findById(nodeId)
        const node = convertCarModelVariantModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
