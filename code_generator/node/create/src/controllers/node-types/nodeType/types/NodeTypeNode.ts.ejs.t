---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type <%= h.changeCase.pascal(nodeType) %>Node = {
    node_type: ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>
    fields: {
        id: number
<% for (prop in properties) { -%>
        <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } -%>

        created_at: string
        updated_at: string
    }
}
