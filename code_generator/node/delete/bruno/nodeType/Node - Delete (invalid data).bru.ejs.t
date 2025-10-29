---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Delete (invalid data).bru
---
meta {
  name: Delete <%= h.changeCase.title(nodeType) %> (invalid data)
  type: http
  tags: [
    delete
    node
    invalid
  ]
}

delete {
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
