---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid sort).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid sort)
  type: http
  tags:
    - get
    - node
    - collection
    - sorting
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?sort_by_property=name&sort_direction=desc"

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
