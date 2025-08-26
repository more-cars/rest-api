---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation -<%= h.changeCase.lower(relationshipName) %>- - Create.bru
---
meta {
  name: Relation "<%= h.changeCase.lower(relationshipName) %>" - Create
  type: http
}

post {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 201
  res.body: isJson
  res.body.<%= h.changeCase.snake(startNodeType) %>_id: eq {{valid<%= h.changeCase.pascal(startNodeType) %>Id}}
  res.body.<%= h.changeCase.snake(endNodeType) %>_id: eq {{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  res.body.relationship_id: gte 0
  res.body.relationship_name: eq <%= h.changeCase.constant(relationshipName) %>
  res.body.created_at: isString
  res.body.updated_at: isString
}

script:pre-request {
  await ensureValid<%= h.changeCase.pascal(startNodeType) %>Exists()
  await ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists()
}
