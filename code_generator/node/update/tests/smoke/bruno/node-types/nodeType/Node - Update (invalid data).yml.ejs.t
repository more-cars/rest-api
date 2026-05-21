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
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"
  body:
    type: json
    data: |-
      {
        "name": null
      }

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "400"
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
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
