---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get by ID (valid data).bru
---
meta {
  name: Get <%= h.changeCase.title(nodeType) %> by ID (valid data)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body: isJson
  res.body.data.id: {{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  res.body.data.created_at: isNotEmpty
  res.body.data.updated_at: isNotEmpty
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ensureValid<%= h.changeCase.pascal(nodeType) %>Exists()
}
