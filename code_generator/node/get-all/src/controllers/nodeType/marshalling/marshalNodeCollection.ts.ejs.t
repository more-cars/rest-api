---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/marshalNodeCollection.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {marshalNode} from "./marshalNode"
import {<%= h.changeCase.pascal(nodeType) %>Response} from "../types/<%= h.changeCase.pascal(nodeType) %>Response"

export function marshalNodeCollection(nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node>) {
    const responseObjects: Array<<%= h.changeCase.pascal(nodeType) %>Response> = []

    nodes.forEach((node: <%= h.changeCase.pascal(nodeType) %>Node) => {
        responseObjects.push(marshalNode(node))
    })

    return responseObjects
}
