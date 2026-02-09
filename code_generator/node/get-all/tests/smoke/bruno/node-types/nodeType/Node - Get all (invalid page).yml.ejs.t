---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid page).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid page)
  type: http
  tags:
    - get
    - node
    - collection
    - pagination
    - invalid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?page=-2"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "400"
    - expression: res.body
      operator: isString
    - expression: res.body
      operator: isNotEmpty
