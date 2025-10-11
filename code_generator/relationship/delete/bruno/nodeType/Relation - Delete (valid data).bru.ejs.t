---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).bru
---
meta {
  name: Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (valid data)
  type: http
}

delete {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 204
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists()
}
