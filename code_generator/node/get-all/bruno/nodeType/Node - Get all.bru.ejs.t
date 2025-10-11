---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get all.bru
---
meta {
  name: Get all <%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>
  type: http
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>
  body: none
  auth: none
}

assert {
  res.status: 200
  res.body.data: isArray
  res.body.data[0].data: isJson
  res.body.data[0].data.id: gte 12000000
}

script:pre-request {
  await lib.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ensureValid<%= h.changeCase.pascal(nodeType) %>Exists()
}
