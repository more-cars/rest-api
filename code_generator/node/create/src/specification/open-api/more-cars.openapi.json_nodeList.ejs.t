---
inject: true
to: src/specification/open-api/more-cars.openapi.json
after: \"oneOf\"
---
          {
            "$ref": "#/components/schemas/<%= h.changeCase.pascal(nodeType) %>"
          },