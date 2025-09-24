import express from "express"
import {Company} from "../../models/companies/Company"
import {marshal} from "./marshal"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await Company.findById(nodeId)

    if (!node) {
        return sendResponse404(res)
    }

    const marshalledData = marshal(node)

    sendResponse200(marshalledData, res)
}
