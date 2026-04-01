import express from "express"
import {Node} from "../../models/Node"
import {convertImageModelNodeToControllerNode} from "../node-types/images/convertImageModelNodeToControllerNode"
import {marshalHasPrimeImageNodeCollection} from "./marshalHasPrimeImageNodeCollection"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse500} from "../responses/sendResponse500"

export async function getNodesPrimeImage(req: express.Request, res: express.Response) {
    const nodeIds = req.params.ids.split(',').map(id => Number(id))

    try {
        const modelNodes = await Node.findPrimeImages(nodeIds)
        const nodes = modelNodes.map(node => convertImageModelNodeToControllerNode(node))
        const marshalledData = marshalHasPrimeImageNodeCollection(nodes)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
