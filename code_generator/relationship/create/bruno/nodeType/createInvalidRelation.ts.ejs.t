---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation -<%= h.changeCase.lower(relationshipName) %>- - Create (invalid).bru
---
meta {
  name: Relation "<%= h.changeCase.lower(relationshipName) %>" - Create (invalid)
  type: http
}

post {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{invalid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: eq 404
  res.body: isString
}
