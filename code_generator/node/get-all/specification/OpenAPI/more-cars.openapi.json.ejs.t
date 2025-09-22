---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: "/companies"\: \{
skip_if: Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`
---
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>"
        ],
        "summary": "Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`",
        "responses": {
          "200": {
            "description": "List of `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>` successfully loaded.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>"
                  }
                }
              }
            }
          }
        }
      },