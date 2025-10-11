---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/marshalNodes.ts
---
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: <%= h.changeCase.pascal(nodeType) %>Node[]) {
    return marshalNodeCollection(nodes)
}
