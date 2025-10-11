---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid filter).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid filter)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?filter_by_property=blubb
  body: none
  auth: none
}

assert {
  res.status: 400
  res.body: isString
}
