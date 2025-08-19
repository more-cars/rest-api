---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(nodetype)) %>/Delete (invalid).bru
---
meta {
  name: Delete (invalid)
  type: http
  seq: 51
}

delete {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/{{invalid<%= h.changeCase.pascal(nodetype) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 404
  res.body: isString
}
