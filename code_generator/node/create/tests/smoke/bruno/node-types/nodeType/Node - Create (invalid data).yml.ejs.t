---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Create (invalid data).yml
---
info:
  name: Create <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
  tags:
    - create
    - node
    - invalid

http:
  method: POST
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"
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
