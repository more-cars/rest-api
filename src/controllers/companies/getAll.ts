import express from "express"
import {extractPaginationParameter} from "../nodes/extractPaginationParameter"
import {isValidPaginationValue} from "../validators/isValidPaginationValue"
import {sendResponse400} from "../responses/sendResponse400"
import {Company} from "../../models/companies/Company"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const page = extractPaginationParameter(req)
    if (!isValidPaginationValue(page)) {
        return sendResponse400(res)
    }

    const nodes = await Company.findAll({page})
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
