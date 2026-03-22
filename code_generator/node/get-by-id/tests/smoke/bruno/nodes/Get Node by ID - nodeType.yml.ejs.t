---
to: tests/smoke/bruno/nodes/Get Node by ID - <%= h.changeCase.title(nodeType) %>.yml
---
info:
  name: Get Node by ID - <%= h.changeCase.title(nodeType) %>
  type: http
  tags:
    - get
    - node
    - valid

http:
  method: GET
  url: "{{baseUrl}}/nodes/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.body
      operator: isJson
    - expression: res.body.id
      operator: eq
      value: "{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"
    - expression: res.body.attributes.created_at
      operator: isString
    - expression: res.body.attributes.created_at
      operator: isNotEmpty
    - expression: res.body.attributes.updated_at
      operator: isString
    - expression: res.body.attributes.updated_at
      operator: isNotEmpty
    - expression: res.body.links.self
      operator: isString
    - expression: res.body.links.self
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
