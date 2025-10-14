---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: <%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>
skip_if: Get the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship for the `<%= h.changeCase.title(startNodeType) %>`
---
    "/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>": {
      "get": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>"
        ],
        "summary": "Get the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship for the `<%= h.changeCase.title(startNodeType) %>`",
        "parameters": [
          {
            "in": "path",
            "name": "<%= h.changeCase.kebab(startNodeType) %>-id",
            "description": "ID of the `<%= h.changeCase.title(startNodeType) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship was successfully loaded.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response"
                }
              }
            }
          },
          "404": {
            "description": "Request failed. The `<%= h.changeCase.title(startNodeType) %>` could not be found in the database.",
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