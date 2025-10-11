---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: '"/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/{<%= h.changeCase.kebab(nodeType) %>-id}": {'
skip_if: 'Delete `<%= h.changeCase.title(nodeType) %>`'
---
      "delete": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(nodeType)) %>"
        ],
        "summary": "Delete `<%= h.changeCase.title(nodeType) %>`",
        "parameters": [
          {
            "in": "path",
            "name": "<%= h.changeCase.kebab(nodeType) %>-id",
            "description": "ID of the `<%= h.changeCase.title(nodeType) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "`<%= h.changeCase.title(nodeType) %>` successfully deleted."
          },
          "404": {
            "description": "Deletion request failed. A `<%= h.changeCase.title(nodeType) %>` with the provided ID could not be found.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },