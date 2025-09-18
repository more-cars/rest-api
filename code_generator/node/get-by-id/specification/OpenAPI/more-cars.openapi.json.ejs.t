---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: .*\},\n.*\"components\"
skip_if: Get `<%= h.changeCase.title(nodeType) %>` by ID
---
    ,
    "/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{<%= h.changeCase.kebab(nodeType) %>-id}": {
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>"
        ],
        "summary": "Get `<%= h.changeCase.title(nodeType) %>` by ID",
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
            "description": "`<%= h.changeCase.title(nodeType) %>` successfully loaded.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>"
                }
              }
            }
          },
          "404": {
            "description": "No `<%= h.changeCase.title(nodeType) %>` with the provided ID found.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }