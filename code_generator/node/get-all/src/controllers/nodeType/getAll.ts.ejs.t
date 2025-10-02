---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll.ts
---
import express from "express"
import {extractPaginationParameter} from "../nodes/extractPaginationParameter"
import {isValidPaginationValue} from "../validators/isValidPaginationValue"
import {sendResponse400} from "../responses/sendResponse400"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const page = extractPaginationParameter(req)
    if (!isValidPaginationValue(page)) {
        return sendResponse400(res)
    }

    const nodes = await <%= h.changeCase.pascal(nodeType) %>.findAll({page})
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
