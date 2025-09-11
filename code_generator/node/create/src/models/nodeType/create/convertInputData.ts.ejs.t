---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convertInputData.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "../types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"

export function convertInputData(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Input<%= h.changeCase.pascal(nodeType) %>Create {
    const convertedData: Input<%= h.changeCase.pascal(nodeType) %>Create = {
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
    }

    return convertedData
}
