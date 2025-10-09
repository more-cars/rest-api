---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Response.ts
---
export type <%= h.changeCase.pascal(nodeType) %>Response = {
    data: {
        id: number
<% for (prop in properties) { %>
        <%= prop %>: <%= properties[prop].datatype %><% if (!properties[prop].mandatory) { %> | null<% } -%>
<% } %>

        created_at: string
        updated_at: string
    }
}
