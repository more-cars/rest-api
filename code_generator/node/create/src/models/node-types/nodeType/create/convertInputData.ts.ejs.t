---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convertInputData.ts
---
<% const properties = JSON.parse(props) -%>
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../types/<%= h.changeCase.pascal(nodeType) %>Input"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: <%= h.changeCase.pascal(nodeType) %>Input): DbInputData {
    return {
<% properties.forEach(prop => { -%>
        <%= prop.name -%>: data.<%= prop.name -%>,
<% }) -%>
    }
}
