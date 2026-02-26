import express from "express"
import {Magazine} from "../../../models/node-types/magazines/Magazine"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        await Magazine.delete(nodeId)

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
