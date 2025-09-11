---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshal.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Response} from "./types/<%= h.changeCase.pascal(nodeType) %>Response"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

export function marshal(node: <%= h.changeCase.pascal(nodeType) %>Node) {
    return {
        id: node.id,
<% for (prop in properties) { -%>
        <%= prop -%>: node.<%= prop -%><% if (!properties[prop].mandatory) { %> ?? null<% } -%>,
<% } -%>
        created_at: node.created_at,
        updated_at: node.updated_at,
    } as <%= h.changeCase.pascal(nodeType) %>Response
}
