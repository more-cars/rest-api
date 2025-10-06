---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Delete.bru
---
meta {
  name: Delete <%= h.changeCase.title(nodeType) %>
  type: http
}

delete {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 204
  res.body: isEmpty
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ensureValid<%= h.changeCase.pascal(nodeType) %>Exists()
}

script:post-response {
  bru.setEnvVar("valid<%= h.changeCase.pascal(nodeType) %>Id", null)
}
