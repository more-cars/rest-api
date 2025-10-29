---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Get ›<%= h.changeCase.kebab(relationshipName) %>‹ (invalid data).bru
---
meta {
  name: Get ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (invalid data)
  type: http
  tags: [
    get
    relation
    invalid
  ]
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{invalid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>
  body: none
  auth: none
}

assert {
  res.status: 404
  res.body: isString
}
