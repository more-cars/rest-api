---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Create ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).yml
---
info:
  name: Create ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (invalid data)
  type: http
  tags:
    - create
    - relation
    - invalid

http:
  method: POST
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/relationships/<%= h.changeCase.kebab(relationshipName) %>"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "404"
    - expression: res.body.errors
      operator: isArray
    - expression: res.body.errors[0].status
      operator: isNotEmpty
    - expression: res.body.errors[0].title
      operator: isNotEmpty
    - expression: res.body.errors[0].detail
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const Ids = require('./lib/Ids.js')
        await Ids.generateInvalidId('<%= h.changeCase.pascal(startNodeType) %>')
        await Ids.generateInvalidId('<%= h.changeCase.pascal(endNodeType) %>')
