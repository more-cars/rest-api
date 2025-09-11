---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Create (ignored data).bru
---
meta {
  name: Create <%= h.changeCase.title(nodeType) %> (ignored data)
  type: http
}

post {
  url: {{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>
  body: json
  auth: none
}

body:json {
<%
    const props = {}
    for (prop in properties) {
        if (properties[prop].mandatory) {
            props[prop] = properties[prop].example
        }
    }
    props["created_at"] = "nope"
    props["updated_at"] = "nonono"
-%>
<%- JSON.stringify(props, null, 2).split('\n').map(line => '  ' + line).join('\n') %>
}

assert {
  res.status: eq 201
  res.body.created_at: neq nope
  res.body.updated_at: neq nonono
}
