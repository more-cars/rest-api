---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(nodeType)) %>/Node - Delete (invalid).bru
---
meta {
  name: Delete <%= h.changeCase.title(nodeType) %> (invalid)
  type: http
}

delete {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/{{invalid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 404
  res.body: isString
}
