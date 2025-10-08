import express from "express"
import {Image} from "../../models/images/Image"
import {marshal} from "./marshal"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await Image.findById(nodeId)

    if (!node) {
        return sendResponse404(res)
    }

    const marshalledData = marshal(node)

    return sendResponse200(marshalledData, res)
}

