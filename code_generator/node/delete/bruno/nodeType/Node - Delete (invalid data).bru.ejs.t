---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(nodeType)) %>/Node - Delete (invalid data).bru
---
meta {
  name: Delete <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
}

delete {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/{{invalid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 404
  res.body: isString
}
