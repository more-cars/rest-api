---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
<% const properties = JSON.parse(props) -%>
import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type <%= h.changeCase.pascal(nodeType) %>Node = {
    node_type: ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>
    fields: {
        id: number
<% properties.forEach(prop => { -%>
        <%= prop.name %>: <%= prop.datatype %><% if (!prop.mandatory) { %> | null<% } %>
<% }) -%>
        created_at: string
        updated_at: string
    }
}
