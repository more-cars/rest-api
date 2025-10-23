---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: \"/relationships/{relationship-id}\"
skip_if: Create `<%= h.changeCase.title(nodeType) %>`
---
    "/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>": {
      "post": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>"
        ],
        "summary": "Create `<%= h.changeCase.title(nodeType) %>`",
        "responses": {
          "201": {
            "description": "`<%= h.changeCase.title(nodeType) %>` successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Response"
                }
              }
            }
          },
          "400": {
            "description": "`<%= h.changeCase.title(nodeType) %>` could not be created. The provided data was invalid or malformed.",
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
    },