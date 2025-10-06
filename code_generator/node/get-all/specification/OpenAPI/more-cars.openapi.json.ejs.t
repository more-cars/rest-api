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
            "$ref": "#/components/parameters/Page"
          },
          {
            "in": "query",
            "name": "sort_by_property",
            "description": "Returns the `<%= h.changeCase.title(nodeType) %>` collection, ordered by the specified property.",
            "schema": {
              "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Properties"
            }
          },
          {
            "$ref": "#/components/parameters/SortDirection"
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