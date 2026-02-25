---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node as <%= h.changeCase.pascal(nodeType) %>NodeInput} from "../../../../db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../types/<%= h.changeCase.pascal(nodeType) %>Node"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode(data: <%= h.changeCase.pascal(nodeType) %>NodeInput): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        node_type: ModelNodeType.<%= h.changeCase.pascal(nodeType) %>,
        attributes: {
            id: data.properties.id,
<% for (prop in properties) { -%>
            <%= prop -%>: data.properties.<%= prop -%>,
<% } -%>
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies <%= h.changeCase.pascal(nodeType) %>Node
}
