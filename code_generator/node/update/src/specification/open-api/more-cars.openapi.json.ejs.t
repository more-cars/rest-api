---
inject: true
to: src/specification/open-api/more-cars.openapi.json
after: '"/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/{<%= h.changeCase.kebab(nodeType) %>-id}": {'
skip_if: 'Update `<%= h.changeCase.title(nodeType) %>`'
---
      "patch": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(nodeType)) %>"
        ],
        "summary": "Update `<%= h.changeCase.title(nodeType) %>`",
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
          "200": {
            "description": "`<%= h.changeCase.title(nodeType) %>` successfully updated.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Response"
                }
              }
            }
          },
          "400": {
            "description": "`<%= h.changeCase.title(nodeType) %>` could not be updated. The provided data was invalid or malformed.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Update request failed. A `<%= h.changeCase.title(nodeType) %>` with the provided ID could not be found.",
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