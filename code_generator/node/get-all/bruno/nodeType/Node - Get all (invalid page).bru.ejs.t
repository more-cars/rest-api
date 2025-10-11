---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all (invalid page).bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %> (invalid page)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>?page=-2
  body: none
  auth: none
}

assert {
  res.status: 400
  res.body: isString
}
