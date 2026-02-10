---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).yml
---
info:
  name: Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (invalid data)
  type: http
  tags:
    - delete
    - relation
    - invalid

http:
  method: DELETE
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>//{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{invalid<%= h.changeCase.pascal(endNodeType) %>Id}}"

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
        await Ids.generateInvalidId('<%= h.changeCase.pascal(endNodeType) %>')
