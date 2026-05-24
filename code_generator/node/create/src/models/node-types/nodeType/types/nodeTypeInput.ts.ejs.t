---
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input.ts
---
<% const properties = JSON.parse(props) -%>
export type <%= h.changeCase.pascal(nodeType) %>Input = {
<% properties.forEach(prop => { -%>
    <%= prop.name %>: <%= prop.datatype %> | null | undefined %>
<% }) -%>
}
