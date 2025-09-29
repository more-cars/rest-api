---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: <%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>
skip_if: Get all `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationships
---
    "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>": {
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Get all `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationships",
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
            "description": "`<%= h.changeCase.title(startNodeType) %>` with the provided ID was found and its `<%= h.changeCase.lower(relationshipName) %>` relationships are returned.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                  }
                }
              }
            }
          },
          "404": {
            "description": "The relationships could not be determined, because there exists no `<%= h.changeCase.title(startNodeType) %>` with the provided ID.",
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