---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convertInputData.ts
---
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "../types/<%= h.changeCase.pascal(nodeType) %>Input"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: <%= h.changeCase.pascal(nodeType) %>Input): DbInputData {
    return {
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
    }
}
