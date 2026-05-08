---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/updateNode.ts
---
<% const properties = JSON.parse(props) -%>
import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input"
import {validateInputData} from "../../nodes/validateInputData"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../models/node-types/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "./convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function updateNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const propertyNames = getNodeTypeSpecification(NodeType.<%= h.changeCase.pascal(nodeType) %>).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as <%= h.changeCase.pascal(nodeType) %>Input

    if (!validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data)

    try {
        const modelNode = await <%= h.changeCase.pascal(nodeType) %>.update(nodeId, data)
        const node = convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
