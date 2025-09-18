---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get by ID (invalid).bru
---
meta {
  name: Get <%= h.changeCase.title(nodeType) %> by ID (invalid)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 404
  res.body: isString
}
