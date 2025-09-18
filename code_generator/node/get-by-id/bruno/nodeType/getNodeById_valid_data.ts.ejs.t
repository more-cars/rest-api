---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get by ID.bru
---
meta {
  name: Get <%= h.changeCase.title(nodeType) %> by ID
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 200
  res.body: isJson
  res.body.id: gte 12000000
  res.body.created_at: isNotEmpty
  res.body.updated_at: isNotEmpty
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ensureValid<%= h.changeCase.kebab(nodeType) %>Exists()
}
