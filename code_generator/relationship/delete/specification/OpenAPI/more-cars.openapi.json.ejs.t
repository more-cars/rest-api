---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: "<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>/{<%= h.changeCase.kebab(startNodeType === endNodeType ? 'partner' : endNodeType) %>-id}"
skip_if: "Deletes the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>`"
---
      "delete": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Deletes the ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>`",
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
            "name": "<%= h.changeCase.kebab(startNodeType === endNodeType ? 'partner' : endNodeType) %>-id",
            "description": "ID of the `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>`",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Deleting ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>` was successful."
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