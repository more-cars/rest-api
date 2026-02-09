---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Delete (invalid data).yml
---
info:
  name: Delete <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
  tags:
    - delete
    - node
    - invalid

http:
  method: DELETE
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{invalid<%= h.changeCase.pascal(nodeType) %>Id}}"

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
        await Ids.generateInvalidId('<%= h.changeCase.pascal(nodeType) %>')
