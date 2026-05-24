---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
<% const properties = JSON.parse(props) -%>
import {DbNodeType} from "../../../types/DbNodeType"

export type <%= h.changeCase.pascal(nodeType) %>Node = {
    node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
    properties: {
        id: number
        created_at: string
        updated_at: string
<% properties.forEach(prop => { -%>
        <%= prop.name %>: <%= prop.datatype %><% if (!prop.mandatory) { %> | null<% } %>
<% }) -%>
    }
}
