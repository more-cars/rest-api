---
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
import {DbNodeType} from "../../../types/DbNodeType"

export type <%= h.changeCase.pascal(nodeType) %>Node = {
    node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
    properties: {
        id: number
        created_at: string
        updated_at: string
<% for (prop in properties) { -%>
        <%= prop %>: <%= properties[prop].datatype -%><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } -%>

    }
}
