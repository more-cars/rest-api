---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Create (ignored data).yml
---
info:
  name: Create <%= h.changeCase.title(nodeType) %> (ignored data)
  type: http
  tags:
    - create
    - node
    - valid

http:
  method: POST
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"
  body:
    type: json
    data: |-
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
    props["created_at"] = "nope"
    props["updated_at"] = "nonono"
-%>
<%- JSON.stringify(props, null, 2).split('\n').map(line => '      ' + line).join('\n') %>

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "201"
    - expression: res.body.data.created_at
      operator: neq
      value: nope
    - expression: res.body.data.updated_at
      operator: neq
      value: nonono
