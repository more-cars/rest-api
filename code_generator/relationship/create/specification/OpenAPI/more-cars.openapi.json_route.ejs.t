---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
before: '"/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}": {'
skip_if: Creates a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship
---
    "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}/<%= h.changeCase.kebab(relationshipName) %>/{<%= h.changeCase.kebab(endNodeType) %>-id}": {
      "post": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Creates a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(endNodeType) %>`",
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
            "description": "Relationship ›<%= h.changeCase.kebab(relationshipName) %>‹ between `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>` successfully created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
                }
              }
            }
          },
          "304": {
            "description": "The relationship ›<%= h.changeCase.kebab(relationshipName) %>‹ between `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(endNodeType) %>` already exists. The existing relationship is returned.",
          },
          "404": {
            "description": "`<%= h.changeCase.title(startNodeType) %>` and/or `<%= h.changeCase.title(endNodeType) %>` could not be found in the database.",
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