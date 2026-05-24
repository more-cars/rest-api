---
to: tests/_toolbox/schemas/response/node-types/<%= h.changeCase.pascal(nodeType) %>Schema.ts
---
<% const properties = JSON.parse(props) -%>
export const <%= h.changeCase.pascal(nodeType) %>Schema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
<% properties.forEach(prop => { -%>
                <%= prop.name %>: {type: ["<%= prop.datatype %><% if (!prop.mandatory) { -%>", "null<% } -%>"]},
<% }) -%>
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
<% properties.forEach(prop => { -%>
<%    if (prop.mandatory) { -%>
                "<%= prop.name %>",
<%    } -%>
<% }) -%>
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
        links: {
            type: "object",
            properties: {
                self: {type: ["string"]},
            },
        },
    },
    required: [
        "type",
        "id",
        "attributes",
        "links",
    ],
    additionalProperties: false,
}
