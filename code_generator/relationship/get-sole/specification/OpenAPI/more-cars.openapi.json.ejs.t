---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: <%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>
skip_if: Get sole `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationship
---
    "/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>": {
      "get": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>"
        ],
        "summary": "Get sole `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationship",
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
            "description": "`<%= h.changeCase.title(startNodeType) %>` and relationship were found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                }
              }
            }
          },
          "404": {
            "description": "The relationship could not be determined, because there exists no `<%= h.changeCase.title(startNodeType) %>` with the provided ID.",
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