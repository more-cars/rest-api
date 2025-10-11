---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(startNodeType)) %>/Relation - Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).bru
---
meta {
  name: Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ relations (valid data)
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body: isJson
  res.body.data: isArray
  res.body.data[0].data: isJson
  res.body.data[0].data.relationship_id: gte 12000000
  res.body.data[0].data.relationship_name: <%= h.changeCase.kebab(relationshipName) %>
  res.body.data[0].data.relationship_partner: isJson
  res.body.data[0].data.relationship_partner.node_type: <%= h.changeCase.kebab(endNodeType) %>
  res.body.data[0].data.relationship_partner.data.id: gte 12000000
  res.body.data[0].data.created_at: isString
  res.body.data[0].data.updated_at: isString
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists()
}
