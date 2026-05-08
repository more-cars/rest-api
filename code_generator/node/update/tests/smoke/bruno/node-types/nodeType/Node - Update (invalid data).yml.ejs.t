---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Update (invalid data).yml
---
info:
  name: Update <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
  tags:
    - update
    - node
    - invalid

http:
  method: PATCH
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{invalid<%= h.changeCase.pascal(nodeType) %>Id}}"
  body:
    type: json
    data: |-
      {}

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "400"
    - expression: res.body
      operator: isString
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
