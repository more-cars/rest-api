---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>Input.ts
---
export type Create<%= h.changeCase.pascal(nodeType) %>Input = {
<% for (prop in properties) { %>
    <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } %>
}
