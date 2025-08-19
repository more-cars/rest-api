---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(nodetype)) %>/Delete.bru
---
meta {
  name: Delete
  type: http
  seq: 50
}

delete {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/{{valid<%= h.changeCase.pascal(nodetype) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 204
  res.body: isEmpty
}

script:pre-request {
  await ensureValid<%= h.changeCase.pascal(nodetype) %>Exists()
}
