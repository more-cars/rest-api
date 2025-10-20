---
to: tests/_toolbox/schemas/<%= h.changeCase.pascal(nodeType) %>Schema.ts
---
export const <%= h.changeCase.pascal(nodeType) %>Schema = {
    type: "object",
    properties: {
        id: {type: "integer"},
<% for (prop in properties) { -%>
        <%= prop %>: {
            type: [
                "<%= properties[prop].datatype %>",
<%    if (!properties[prop].mandatory) { -%>
                "null",
<%    } -%>
            ]
        },
<% } -%>
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "id",
<% for (prop in properties) { -%>
<%    if (properties[prop].mandatory) { -%>
        "<%= prop %>",
<%    } -%>
<% } -%>
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
