---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getById.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "./convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)

    try {
        const modelNode = await <%= h.changeCase.pascal(nodeType) %>.findById(nodeId)
        const node = convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(modelNode)
        const marshalledData = marshalNode(node.fields)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
