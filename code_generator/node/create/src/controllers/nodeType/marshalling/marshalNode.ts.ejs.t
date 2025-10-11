---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/marshalNode.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {<%= h.changeCase.pascal(nodeType) %>Response} from "./types/<%= h.changeCase.pascal(nodeType) %>Response"

export function marshalNode(node: <%= h.changeCase.pascal(nodeType) %>Node) {
    return marshalSingleNode({
        id: node.id,
<% for (prop in properties) { -%>
        <%= prop -%>: node.<%= prop -%><% if (!properties[prop].mandatory) { %> ?? null<% } -%>,
<% } -%>
        created_at: node.created_at,
        updated_at: node.updated_at,
    } as <%= h.changeCase.pascal(nodeType) %>Response
}
