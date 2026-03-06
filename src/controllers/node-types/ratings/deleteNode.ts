import express from "express"
import {Rating} from "../../../models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        await Rating.delete(nodeId)

        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
