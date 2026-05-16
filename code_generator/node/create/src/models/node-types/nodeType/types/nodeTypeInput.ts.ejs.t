---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input.ts
---
export type <%= h.changeCase.pascal(nodeType) %>Input = {
<% for (prop in properties) { -%>
    <%= prop %>: <%= properties[prop].datatype %> | null | undefined %>
<% } -%>
}
