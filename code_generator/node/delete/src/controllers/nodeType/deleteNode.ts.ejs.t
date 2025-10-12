---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>/deleteNode.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        await <%= h.changeCase.pascal(nodeType) %>.delete(nodeId)

        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
