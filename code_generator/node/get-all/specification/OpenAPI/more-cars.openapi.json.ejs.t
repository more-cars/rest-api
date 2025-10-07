---
inject: true
to: specification/OpenAPI/more-cars.openapi.json
after: "/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"\: \{
skip_if: Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`
---
      "get": {
        "tags": [
          "<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>"
        ],
        "summary": "Get all `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>`",
        "parameters": [
          {
            "$ref": "#/components/parameters/Page"
          },
          {
            "in": "query",
            "name": "sort_by_property",
            "description": "Returns the `<%= h.changeCase.title(nodeType) %>` collection, ordered by the specified property.",
            "schema": {
              "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Properties"
            }
          },
          {
            "$ref": "#/components/parameters/SortDirection"
          }
          {
            "in": "query",
            "name": "filter_by_property",
            "description": "Specifies by which node property the `<%= h.changeCase.title(nodeType) %>` collection should be filtered.",
            "schema": {
              "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>Properties"
            }
          },
          {
            "$ref": "#/components/parameters/FilterValue"
          },
          {
            "$ref": "#/components/parameters/FilterOperator"
          }
        ],
        "responses": {
          "200": {
            "description": "List of `<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>` successfully loaded.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>"
                  }
                }
              }
            }
          },
          "400": {
            "description": "One or multiple of the provided collection parameters ('page', 'sort_by_property', 'sort_direction', 'filter_by_property', 'filter_value', 'filter_operator') are invalid.",
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