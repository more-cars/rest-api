---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Create (invalid data).bru
---
meta {
  name: Create <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
  tags: [
    create
    node
    invalid
  ]
}

post {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>
  body: json
  auth: none
}

body:json {
  {}
}

assert {
  res.status: 400
  res.body: isString
}
