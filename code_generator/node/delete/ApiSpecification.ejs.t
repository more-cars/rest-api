---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: '"/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/{<%= h.changeCase.kebab(nodetype) %>-id}": {'
skip_if: 'Delete `<%= h.changeCase.title(nodetype) %>`'
---
      "delete": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(nodetype)) %>"
        ],
        "summary": "Delete `<%= h.changeCase.title(nodetype) %>`",
        "parameters": [
          {
            "in": "path",
            "name": "<%= h.changeCase.kebab(nodetype) %>-id",
            "description": "ID of the `<%= h.changeCase.title(nodetype) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "`<%= h.changeCase.title(nodetype) %>` was deleted."
          },
          "404": {
            "description": "No `<%= h.changeCase.title(nodetype) %>` with the provided ID found.",
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