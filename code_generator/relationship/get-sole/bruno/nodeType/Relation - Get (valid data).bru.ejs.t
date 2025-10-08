---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Get ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).bru
---
meta {
  name: Get ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (valid data)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>
  body: none
  auth: none
}

assert {
  res.status: eq 200
  res.body: isJson
  res.body.<%= h.changeCase.snake(startNodeType) %>_id: eq {{valid<%= h.changeCase.pascal(startNodeType) %>Id}}
  res.body.<%= h.changeCase.snake(endNodeType) %>_id: gte 12000000
  res.body.relationship_id: gte 12000000
  res.body.relationship_name: eq <%= h.changeCase.kebab(relationshipName) %>
  res.body.created_at: isString
  res.body.updated_at: isString
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists()
}
