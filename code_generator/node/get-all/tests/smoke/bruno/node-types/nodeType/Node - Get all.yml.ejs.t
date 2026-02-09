---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all.yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>
  type: http
  tags:
    - get
    - node
    - collection
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.body.data
      operator: isArray
    - expression: res.body.data[0].data
      operator: isJson
    - expression: res.body.data[0].data.id
      operator: gte
      value: "12000000"
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
