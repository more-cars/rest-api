---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: \"schemas\"
skip_if: \"<%= h.changeCase.pascal(nodeType) %>Properties\"
---
<%
    const enumProperties = []

    enumProperties.push('id')
    enumProperties('created_at')
    enumProperties('updated_at')

    for (prop in properties) {
        enumProperties.push(prop)
    }
-%>
      "<%= h.changeCase.pascal(nodeType) %>Properties": {
        "type": "string",
        "enum": <%- JSON.stringify(enumProperties, null, 2).split('\n').map(line => '        ' + line).join('\n') %>,
        "default": "id"
      },