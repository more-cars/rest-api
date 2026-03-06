---
to: tests/_toolbox/schemas/response/<%= h.changeCase.pascal(nodeType) %>Schema.ts
---
export const <%= h.changeCase.pascal(nodeType) %>Schema = {
    type: "object",
    properties: {
        type: {type: ["string"]},
        id: {type: ["integer"]},
        attributes: {
            type: "object",
            properties: {
<% for (prop in properties) { -%>
                <%= prop %>: {type: ["<%= properties[prop].datatype %>"<% if (!properties[prop].mandatory) { -%> ", null"<% } -%>]},
<% } -%>
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},
            },
            required: [
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory) { -%>
                "<%= prop %>",
<%    } -%>
<% } -%>
                "created_at",
                "updated_at",
            ],
            additionalProperties: false,
        },
    },
    required: [
        "type",
        "id",
        "attributes",
    ],
    additionalProperties: false,
}
