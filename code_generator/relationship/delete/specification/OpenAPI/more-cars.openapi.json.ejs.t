---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: <%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>/{<%= h.changeCase.kebab(endNodeType) %>-id}
skip_if: Deletes a `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationship
---
      "delete": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Deletes a `<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.lower(relationshipName) %>` relationship",
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
          "204": {
            "description": "The relationship between both nodes was successfully deleted."
          },
          "404": {
            "description": "One of the nodes (or both) don't exist or there exists no `<%= h.changeCase.lower(relationshipName) %>` relationship between them.",
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