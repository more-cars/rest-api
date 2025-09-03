---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation -<%= h.changeCase.lower(relationshipName) %>- - Get (invalid).bru
---
meta {
  name: Relation "<%= h.changeCase.lower(relationshipName) %>" - Get (invalid)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>
  body: none
  auth: none
}

assert {
  res.status: eq 404
  res.body: isString
}
