---
to: tests/_toolbox/schemas/db/<%= h.changeCase.pascal(nodeType) %>Schema.ts
---
<% const properties = JSON.parse(props) -%>
export const <%= h.changeCase.pascal(nodeType) %>Schema = {
    type: "object",
    properties: {
        node_type: {type: ["string"]},
        properties: {
            type: "object",
            properties: {
                id: {type: ["integer"]},
<% properties.forEach(prop => { -%>
                <%= prop.name %>: {type: ["<%= prop.datatype %><% if (!prop.mandatory) { -%>", "null<% } -%>"]},
<% }) -%>
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
                "id",
<% properties.forEach(prop => { -%>
<%    if (prop.mandatory) { -%>
                "<%= prop.name %>",
<%    } -%>
<% }) -%>
                "created_at",
                "updated_at",
            ],
        },
    },
    additionalProperties: false,
}
