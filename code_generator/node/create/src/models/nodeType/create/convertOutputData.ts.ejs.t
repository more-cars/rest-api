---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/convertOutputData.ts
---
import {<%= h.changeCase.pascal(nodeType) %>Node as <%= h.changeCase.pascal(nodeType) %>NodeInput} from "../../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>Node as <%= h.changeCase.pascal(nodeType) %>NodeOutput} from "../types/<%= h.changeCase.pascal(nodeType) %>Node"

export function convertOutputData(data: <%= h.changeCase.pascal(nodeType) %>NodeInput): <%= h.changeCase.pascal(nodeType) %>NodeOutput {
    const convertedData: <%= h.changeCase.pascal(nodeType) %>NodeOutput = {
        id: data.id,
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return convertedData
}
