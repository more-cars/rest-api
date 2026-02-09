---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get by ID (invalid data).yml
---
info:
  name: Get <%= h.changeCase.title(nodeType) %> by ID (invalid data)
  type: http
  tags:
    - get
    - node
    - invalid

http:
  method: GET
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
