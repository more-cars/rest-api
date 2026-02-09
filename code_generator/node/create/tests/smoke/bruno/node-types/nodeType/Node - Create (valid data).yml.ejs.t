---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Create (valid data).yml
---
info:
  name: Create <%= h.changeCase.title(nodeType) %> (valid data)
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
        if (properties[prop].datatype === 'string') {
            props[prop] = properties[prop].example
        } else if (properties[prop].datatype === 'number') {
            props[prop] = parseInt(properties[prop].example)
        } else if (properties[prop].datatype === 'boolean') {
            props[prop] = properties[prop].example === 'true' ? true : false
        }
    }
-%>
<%- JSON.stringify(props, null, 2).split('\n').map(line => '  ' + line).join('\n') %>

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "201"
    - expression: res.body
      operator: isJson
    - expression: res.body.data.id
      operator: gte
      value: "12000000"
  scripts:
    - type: tests
      code: |-
        test("both timestamps should be identical", function () {
          const data = res.getBody()
          expect(data.data.created_at).to.eql(data.data.updated_at)
        })
