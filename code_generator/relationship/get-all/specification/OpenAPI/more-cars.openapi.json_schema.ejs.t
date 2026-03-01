---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: "<%= h.changeCase.pascal(startNodeType) %>Properties"
skip_if: "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>CollectionResponse"
---
      "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>CollectionResponse": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response"
            }
          }
        }
      },