---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid sort).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid sort)
  type: http
  tags: [
    get
    node
    collection
    sorting
    valid
  ]
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?sort_by_property=name&sort_direction=desc
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body.data: isArray
  res.body.data[0].data: isJson
  res.body.data[0].data.id: gte 12000000
}
