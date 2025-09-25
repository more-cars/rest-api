---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Create (valid data).bru
---
meta {
  name: Create ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (valid data)
  type: http
}

post {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 201
  res.body: isJson
  res.body.<%= h.changeCase.snake(startNodeType) %>_id: eq {{valid<%= h.changeCase.pascal(startNodeType) %>Id}}
  res.body.<%= h.changeCase.snake(endNodeType) %>_id: eq {{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  res.body.relationship_id: gte 12_000_000
  res.body.relationship_name: eq <%= h.changeCase.constant(relationshipName) %>
  res.body.created_at: isString
  res.body.updated_at: isString
}

script:pre-request {
  await ensureValid<%= h.changeCase.pascal(startNodeType) %>Exists()
  await ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists()
}
