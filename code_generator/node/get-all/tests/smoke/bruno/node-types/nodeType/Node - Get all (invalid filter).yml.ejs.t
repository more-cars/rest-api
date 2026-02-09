---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid filter).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid filter)
  type: http
  tags:
    - get
    - node
    - collection
    - filter
    - invalid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=blubb"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "400"
    - expression: res.body
      operator: isString
    - expression: res.body
      operator: isNotEmpty
