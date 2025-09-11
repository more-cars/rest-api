---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create.ts
---
export type Input<%= h.changeCase.pascal(nodeType) %>Create = {
<% for (prop in properties) { %>
    <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } %>
}
