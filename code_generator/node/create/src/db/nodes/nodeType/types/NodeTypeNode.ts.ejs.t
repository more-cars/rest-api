---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
export type <%= h.changeCase.pascal(nodeType) %>Node = {
    id: number
    created_at: string
    updated_at: string
<% for (prop in properties) { %>
    <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } %>
}
