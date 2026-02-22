---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export type <%= h.changeCase.pascal(nodeType) %>Node = {
    node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>
    attributes: {
        id: number

<% for (prop in properties) { -%>
        <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } -%>

        created_at: string
        updated_at: string
    }
}
