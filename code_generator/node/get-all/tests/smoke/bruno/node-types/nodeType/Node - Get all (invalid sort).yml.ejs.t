---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid sort).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid sort)
  type: http
  tags:
    - get
    - node
    - collection
    - sorting
    - invalid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?sort_by_property=blubb"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "400"
    - expression: res.body
      operator: isString
    - expression: res.body
      operator: isNotEmpty
