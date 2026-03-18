---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid page).yml
---
info:
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid page)
  type: http
  tags:
    - get
    - node
    - collection
    - pagination
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?page=2"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.body.data
      operator: isArray
    - expression: res.body.meta.page.current
      operator: isNumber
    - expression: res.body.meta.page.size
      operator: isNumber
    - expression: res.body.meta.page.total_pages
      operator: isNumber
    - expression: res.body.meta.page.total_nodes
      operator: isNumber
    - expression: res.body.links.self
      operator: isString
    - expression: res.body.links.first
      operator: isString
    - expression: res.body.links.prev
      operator: isString
    - expression: res.body.links.next
      operator: isString
    - expression: res.body.links.last
      operator: isString
