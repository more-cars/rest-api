---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: "/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"\: \{
skip_if: Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`
---
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>"
        ],
        "summary": "Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`",
        "parameters": [
          {
            "in": "query",
            "name": "page",
            "description": "Defines, which slice of the whole `<%= h.changeCase.title(nodeType) %>` collection should be returned. Each full page contains 100 nodes. The last page contains the remaining nodes. Pages that are out of range return an empty list.",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1
            }
          }
        ],
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