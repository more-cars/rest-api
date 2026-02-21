---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node as <%= h.changeCase.pascal(nodeType) %>NodeInput} from "../../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../types/<%= h.changeCase.pascal(nodeType) %>Node"

export function convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode(data: <%= h.changeCase.pascal(nodeType) %>NodeInput): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        id: data.id,
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as <%= h.changeCase.pascal(nodeType) %>Node
}
