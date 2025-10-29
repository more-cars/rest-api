---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation - Get specific ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).bru
---
meta {
  name: Get specific ›<%= h.changeCase.lower(relationshipName) %>‹ relation (invalid data)
  type: http
  tags: [
    get
    relation
    invalid
  ]
}

get {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{invalid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 404
  res.body: isString
}
