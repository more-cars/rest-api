import express from "express"
import {Brand} from "../../models/brands/Brand"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await Brand.delete(nodeId)

    if (!success) {
        return sendResponse404(res)
    }

    return sendResponse204(res)
}
