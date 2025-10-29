---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).bru
---
meta {
  name: Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (invalid data)
  type: http
  tags: [
    delete
    relation
    invalid
  ]
}

delete {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{invalid<%= h.changeCase.pascal(endNodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 404
  res.body: isString
}
