---
inject: true
to: src/specification/open-api/more-cars.openapi.json
before: \"<%= h.changeCase.pascal(startNodeType) %>Properties\"
skip_if: \"<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>CollectionResponse\"
---
      "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>CollectionResponse": {
        "type": "object",
        "properties": {
          "links": {
            "type": "object",
            "properties": {
              "self": {
                "type": "string",
                "example": "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/12345678/<%= h.changeCase.kebab(relationshipName) %>"
              }
            }
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "example": "<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>"
                },
                "id": {
                  "$ref": "#/components/schemas/NodeId"
                },
                "attributes": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(endNodeType) %>"
                }
              }
            }
          }
        }
      },