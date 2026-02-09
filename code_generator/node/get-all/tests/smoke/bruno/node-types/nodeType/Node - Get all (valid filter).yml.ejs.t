---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid filter).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid filter)
  type: http
  tags:
    - get
    - node
    - collection
    - filter
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=id&filter_value=1234&filter_operator=gte"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.body.data
      operator: isArray
