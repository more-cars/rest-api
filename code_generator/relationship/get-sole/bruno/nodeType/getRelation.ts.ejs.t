---
to: bruno/<%= h.inflection.pluralize(h.changeCase.title(startNodeType)) %>/Relation -<%= h.changeCase.lower(relationshipName) %>- - Get.bru
---
meta {
  name: Relation "<%= h.changeCase.lower(relationshipName) %>" - Get
  type: http
}

get {
  url: {{baseUrl}}/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>
  body: none
  auth: none
}

assert {
  res.status: eq 200
}

script:pre-request {
  await ensureValid<%= h.changeCase.pascal(startNodeType) %>Exists()
}
