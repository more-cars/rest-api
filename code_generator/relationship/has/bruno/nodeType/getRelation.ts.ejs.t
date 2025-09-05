---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation -<%= h.changeCase.lower(relationshipName) %>- - Has.bru
---
meta {
  name: Relation "<%= h.changeCase.lower(relationshipName) %>" - Has
  type: http
}

get {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 200
}

script:pre-request {
  await lib.<%= h.inflection.pluralize(h.changeCase.pascal(startNodeType)) %>.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists()
}
