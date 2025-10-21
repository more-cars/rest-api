---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (valid filter).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (valid filter)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=id&filter_value=1234&filter_operator=gte
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body.data: isArray
}
