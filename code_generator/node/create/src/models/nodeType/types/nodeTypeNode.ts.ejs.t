---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node.ts
---
export type <%= h.changeCase.pascal(nodeType) %>Node = {
    id: number
<% for (prop in properties) { %>
    <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } %>

    created_at: string
    updated_at: string
}
