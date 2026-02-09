---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get by ID (valid data).yml
---
info:
  name: Get <%= h.changeCase.title(nodeType) %> by ID (valid data)
  type: http
  tags:
    - get
    - node
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.body
      operator: isJson
    - expression: res.body.data.id
      operator: eq
      value: "{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"
    - expression: res.body.data.created_at
      operator: isString
    - expression: res.body.data.created_at
      operator: isNotEmpty
    - expression: res.body.data.updated_at
      operator: isString
    - expression: res.body.data.updated_at
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
