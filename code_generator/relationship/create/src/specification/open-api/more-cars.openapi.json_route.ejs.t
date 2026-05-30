---
inject: true
to: src/specification/open-api/more-cars.openapi.json
before: '"/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{<%= h.changeCase.kebab(startNodeType) %>-id}": {'
skip_if: Creates a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(endNodeType) %>`
---
    },
      "post": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>"
        ],
        "summary": "Creates a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship between the `<%= h.changeCase.title(startNodeType) %>` and the `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>`",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ModifyRelationshipRequestData"
              }
            }
          }
        },
        "responses": {
          "204": {
            "description": "Relationship ›<%= h.changeCase.kebab(relationshipName) %>‹ between `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>` successfully created."
          },
          "304": {
            "description": "The relationship ›<%= h.changeCase.kebab(relationshipName) %>‹ between `<%= h.changeCase.title(startNodeType) %>` and `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>` already exists."
          },
          "404": {
            "description": "Request failed. `<%= h.changeCase.title(startNodeType) %>` and/or `<%= h.changeCase.title(startNodeType === endNodeType ? 'partner' : endNodeType) %>` could not be found in the database.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/Response404"
                }
              }
            }
          }
        }
      }