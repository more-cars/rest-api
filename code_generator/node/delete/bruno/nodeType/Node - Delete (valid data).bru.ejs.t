---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Delete (valid data).bru
---
meta {
  name: Delete <%= h.changeCase.title(nodeType) %> (valid data)
  type: http
  tags: [
    delete
    node
    valid
  ]
}

delete {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 204
  res.body: isEmpty
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ensureValid<%= h.changeCase.pascal(nodeType) %>Exists()
}

script:post-response {
  bru.setEnvVar("valid<%= h.changeCase.pascal(nodeType) %>Id", null)
}
