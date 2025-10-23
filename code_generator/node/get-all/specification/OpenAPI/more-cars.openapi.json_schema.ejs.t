---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: \"<%= h.changeCase.pascal(nodeType) %>Properties\"
skip_if: \"<%= h.changeCase.pascal(nodeType) %>CollectionResponse\"
---
      "<%= h.changeCase.pascal(nodeType) %>CollectionResponse": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Response"
            }
          }
        }
      },