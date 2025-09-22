import express from "express"
import {Company} from "../../models/companies/Company"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await Company.delete(nodeId)

    if (!success) {
        return sendResponse404(res)
    }

    sendResponse204(res)
}
