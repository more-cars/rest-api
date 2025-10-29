---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid page).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid page)
  type: http
  tags: [
    get
    node
    collection
    pagination
    valid
  ]
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?page=2
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body.data: isArray
}
