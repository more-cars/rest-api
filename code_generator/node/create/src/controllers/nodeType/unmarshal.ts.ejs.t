---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "./types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"

export function unmarshal(data: any): Create<%= h.changeCase.pascal(nodeType) %>RawInput {
    return {
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
    } as Create<%= h.changeCase.pascal(nodeType) %>RawInput
}
