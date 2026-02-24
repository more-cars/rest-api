---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convertInputData.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "../types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"

export function convertInputData(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Input<%= h.changeCase.pascal(nodeType) %>Create {
    return {
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
    } satisfies Input<%= h.changeCase.pascal(nodeType) %>Create
}
