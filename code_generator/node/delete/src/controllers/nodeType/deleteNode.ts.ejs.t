---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>/deleteNode.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await <%= h.changeCase.pascal(nodeType) %>.delete(nodeId)

    if (!success) {
        return sendResponse404(res)
    }

    return sendResponse204(res)
}
