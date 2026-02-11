---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Get ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).yml
---
info:
  name: Get ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (invalid data)
  type: http
  tags:
    - get
    - relation
    - invalid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{invalidBrandId}}/<%= h.changeCase.kebab(relationshipName) %>"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "404"
    - expression: res.body
      operator: isString
    - expression: res.body
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const Ids = require('./lib/Ids.js')
        await Ids.generateInvalidId('<%= h.changeCase.pascal(startNodeType) %>')
