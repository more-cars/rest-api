---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Get by ID (invalid data).bru
---
meta {
  name: Get <%= h.changeCase.title(nodeType) %> by ID (invalid data)
  type: http
  tags: [
    get
    node
    invalid
  ]
}

get {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{invalid<%= h.changeCase.pascal(nodeType) %>Id}}
  body: none
  auth: none
}

assert {
  res.status: 404
  res.body: isString
}

script:pre-request {
  lib.tools.generateInvalidId('<%= h.changeCase.pascal(nodeType) %>')
}
