---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/companies/<%= h.changeCase.pascal(nodeType) %>"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await <%= h.changeCase.pascal(nodeType) %>.findAll()
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
