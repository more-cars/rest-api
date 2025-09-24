---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getById.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {marshal} from "./marshal"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await <%= h.changeCase.pascal(nodeType) %>.findById(nodeId)

    if (!node) {
        return sendResponse404(res)
    }

    const marshalledData = marshal(node)

    sendResponse200(marshalledData, res)
}
