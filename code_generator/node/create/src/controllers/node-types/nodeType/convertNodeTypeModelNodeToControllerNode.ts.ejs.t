---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode.ts
---
<% const properties = JSON.parse(props) -%>
import type {<%= h.changeCase.pascal(nodeType) %>Node as Model<%= h.changeCase.pascal(nodeType) %>Node} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "./types/<%= h.changeCase.pascal(nodeType) %>Node"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(modelNode: Model<%= h.changeCase.pascal(nodeType) %>Node): <%= h.changeCase.pascal(nodeType) %>Node {
    return {
        node_type: ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>,
        fields: {
            id: modelNode.attributes.id,
<% properties.forEach(prop => { -%>
            <%= prop.name %>: modelNode.attributes.<%= prop.name %><% if (!prop.mandatory) { %> ?? null<% } -%>,
<% }) -%>
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies <%= h.changeCase.pascal(nodeType) %>Node
}
