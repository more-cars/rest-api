import express from "express"
import {Image} from "../../models/images/Image"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await Image.findAll()
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
