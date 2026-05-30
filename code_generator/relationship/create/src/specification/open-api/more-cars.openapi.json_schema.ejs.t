---
inject: true
to: src/specification/open-api/more-cars.openapi.json
before: \"<%= h.changeCase.pascal(startNodeType) %>Properties\"
skip_if: \"<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>\"
---
      "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response": {
        "type": "object",
        "properties": {
          "links": {
            "type": "object",
            "properties": {
              "self": {
                "type": "string",
                "example": "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/12345678/<%= h.changeCase.kebab(relationshipName) %>"
              },
              "related": {
                "type": "string",
                "example": "/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/87654321"
              }
            }
          },
          "data": {
            "$ref": "#/components/schemas/<%= h.changeCase.pascal(endNodeType) %>"
          }
        }
      },