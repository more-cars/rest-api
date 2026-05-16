---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode.ts
---
import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input"
import {validateInputData} from "../../nodes/validateInputData"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "./convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createNode(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.<%= h.changeCase.pascal(nodeType) %>).properties.map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as <%= h.changeCase.pascal(nodeType) %>Input

    if (!validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>, 'CREATE')) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await <%= h.changeCase.pascal(nodeType) %>.create(data)
        const node = convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
