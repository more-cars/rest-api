---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: <%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>
skip_if: Returns the '<%= h.changeCase.lower(relationshipName) %>' relationship between the given `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>`
---
      "get": {
        "tags": [
          "<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>"
        ],
        "summary": "Returns the '<%= h.changeCase.lower(relationshipName) %>' relationship between the given `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>`",
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
            "description": "The relationship between both nodes was found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                }
              }
            }
          },
          "404": {
            "description": "One of the nodes (or both) don't exist or there exists no '<%= h.changeCase.lower(relationshipName) %>' relationship between them.",
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