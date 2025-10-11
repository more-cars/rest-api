---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: <%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>/{<%= h.changeCase.kebab(endNodeType) %>-id}
skip_if: Get the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>`
---
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Get the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>`",
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
          "200": {
            "description": "The specific ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship was found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                }
              }
            }
          },
          "404": {
            "description": "Request failed. Either the nodes don't exist or there exists no ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between them.",
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