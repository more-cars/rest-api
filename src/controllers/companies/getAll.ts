import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await Company.findAll()
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
