---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).yml
---
info:
  name: Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ relations (invalid data)
  type: http
  tags:
    - get
    - relation
    - collection
    - invalid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "404"
    - expression: res.headers["content-type"]
      operator: contains
      value: application/vnd.api+json
    - expression: res.headers["cache-control"]
      operator: isNotEmpty
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
