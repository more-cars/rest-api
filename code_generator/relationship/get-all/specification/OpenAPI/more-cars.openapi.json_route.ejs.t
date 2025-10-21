---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: <%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>
skip_if: Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships for the `<%= h.changeCase.title(startNodeType) %>`
---
    "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>": {
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships for the `<%= h.changeCase.title(startNodeType) %>`",
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
            "description": "The collection of ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships was successfully loaded.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>CollectionResponse"
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