---
to: bruno/<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>/Node - Create (minimal data).bru
---
meta {
  name: Create <%= h.changeCase.title(nodeType) %> (minimal data)
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
            if (properties[prop].datatype === 'string') {
                props[prop] = properties[prop].example
            } else if (properties[prop].datatype === 'number') {
                props[prop] = parseInt(properties[prop].example)
            } else if (properties[prop].datatype === 'boolean') {
                props[prop] = properties[prop].example === 'true' ? true : false
            }
        }
    }
-%>
<%- JSON.stringify(props, null, 2).split('\n').map(line => '  ' + line).join('\n') %>
}

assert {
  res.status: eq 201
  res.body: isJson
  res.body.data.id: gte 12000000
}
