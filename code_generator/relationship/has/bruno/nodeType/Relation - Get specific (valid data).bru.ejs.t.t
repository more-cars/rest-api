---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation - Get specific ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).bru
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
  res.status: 200
  res.body: isJson
  res.body.data.relationship_id: gte 12000000
  res.body.data.relationship_name: <%= h.changeCase.kebab(relationshipName) %>
  res.body.data.relationship_partner: isJson
  res.body.data.relationship_partner.node_type: <%= h.changeCase.kebab(endNodeType) %>
  res.body.data.relationship_partner.data.id: {{valid<%= h.changeCase.pascal(endNodeType) %>Id}}
  res.body.data.created_at: isString
  res.body.data.updated_at: isString
}

script:pre-request {
  await lib.<%= h.inflection.pluralize(h.changeCase.pascal(startNodeType)) %>.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists()
}
