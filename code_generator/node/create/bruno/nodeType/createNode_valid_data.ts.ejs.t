---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Create (valid data).bru
---
meta {
  name: Create <%= h.changeCase.title(nodeType) %> (valid data)
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
        props[prop] = properties[prop].example
    }
-%>
<%- JSON.stringify(props, null, 2).split('\n').map(line => '  ' + line).join('\n') %>
}

assert {
  res.status: eq 201
  res.body: isJson
  res.body.id: gte 12000000
}

tests {
  test("both timestamps should be identical", function () {
    const data = res.getBody()
    expect(data.created_at).to.eql(data.updated_at)
  })
}
