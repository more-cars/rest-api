---
inject: true
to: src/specification/open-api/more-cars.openapi.json
before: \"Relationship\"
skip_if: \"<%= h.changeCase.pascal(nodeType) %>\"
---
<% const properties = JSON.parse(props) -%>
<%
    const schemaProperties = {}

    properties.forEach(prop => {
        schemaProperties[prop.name] = {
            type: prop.datatype,
            description: "",
            example: prop.example,
        }
    })

    schemaProperties['created_at'] = {
        $ref: "#/components/schemas/CreatedAt"
    }

    schemaProperties['updated_at'] = {
        $ref: "#/components/schemas/UpdatedAt"
    }

    const requiredProperties = []
    properties.forEach(prop => {
        if (prop.mandatory) {
            requiredProperties.push(prop.name)
        }
    })
-%>
      "<%= h.changeCase.pascal(nodeType) %>": {
        "type": "object",
        "required": <%- JSON.stringify(requiredProperties, null, 2).split('\n').map(line => '        ' + line).join('\n') %>,
        "properties": <%- JSON.stringify(schemaProperties, null, 2).split('\n').map(line => '        ' + line).join('\n') %>
      },
      "<%= h.changeCase.pascal(nodeType) %>Response": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "",
            "enum": [
              "<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"
            ],
            "example": "<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"
          },
          "id": {
            "$ref": "#/components/schemas/NodeId"
          },
          "attributes": {
            "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>"
          },
          "links": {
            "type": "object",
            "properties": {
              "self": {
                "type": "string",
                "example": "/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/12345678"
              }
            }
          }
        }
      },
<%
    const enumProperties = []

    enumProperties.push('created_at')
    enumProperties.push('updated_at')

    properties.forEach(prop => {
        enumProperties.push(prop.name)
    })
-%>
      "<%= h.changeCase.pascal(nodeType) %>Properties": {
        "type": "string",
        "enum": <%- JSON.stringify(enumProperties, null, 2).split('\n').map(line => '        ' + line).join('\n') %>,
        "default": "name"
      },