---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal.ts
---
import {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "./types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshal(data): Create<%= h.changeCase.pascal(nodeType) %>RawInput {
    return {
<% for (prop in properties) { -%>
        <%= prop -%>: data.<%= prop -%>,
<% } -%>
    } as Create<%= h.changeCase.pascal(nodeType) %>RawInput
}
