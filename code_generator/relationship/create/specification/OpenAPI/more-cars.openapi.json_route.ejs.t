---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: '"/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}": {'
skip_if: Creates a '<%= h.changeCase.lower(relationshipName) %>' relationship
---
    "/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>/{<%= h.changeCase.kebab(endNodeType) %>-id}": {
      "post": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>"
        ],
        "summary": "Creates a '<%= h.changeCase.lower(relationshipName) %>' relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(endNodeType) %>`",
        "parameters": [
          {
            "in": "path",
            "name": "<%= h.changeCase.kebab(startNodeType) %>-id",
            "description": "ID of the `<%= h.changeCase.title(startNodeType) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "path",
            "name": "<%= h.changeCase.kebab(endNodeType) %>-id",
            "description": "ID of the `<%= h.changeCase.title(endNodeType) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "`<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>` successfully connected.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                }
              }
            }
          },
          "404": {
            "description": "`<%= h.changeCase.title(startNodeType) %>` or `<%= h.changeCase.title(endNodeType) %>` not found.",
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