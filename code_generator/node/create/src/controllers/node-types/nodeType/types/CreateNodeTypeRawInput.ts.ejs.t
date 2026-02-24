---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>RawInput.ts
---
export type Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<% for (prop in properties) { -%>
    <%= prop -%>: unknown
<% } -%>
}
