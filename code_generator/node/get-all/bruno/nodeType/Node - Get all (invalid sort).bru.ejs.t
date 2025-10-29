---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid sort).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid sort)
  type: http
  tags: [
    get
    node
    collection
    sorting
    invalid
  ]
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?sort_by_property=blubb
  body: none
  auth: none
}

assert {
  res.status: 400
  res.body: isString
}
