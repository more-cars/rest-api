---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Delete (valid data).yml
---
info:
  name: Delete <%= h.changeCase.title(nodeType) %> (valid data)
  type: http
  tags:
    - delete
    - node
    - valid

http:
  method: DELETE
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "204"
    - expression: res.body
      operator: isEmpty
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
    - type: after-response
      code: |-
        const Ids = require('./lib/Ids.js')
        Ids.forgetId('<%= h.changeCase.pascal(nodeType) %>')
