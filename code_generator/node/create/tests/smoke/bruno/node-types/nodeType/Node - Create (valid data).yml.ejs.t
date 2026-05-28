---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Create (valid data).yml
---
<% const properties = JSON.parse(props) -%>
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
    const props_out = {}
    properties.forEach(prop => {
        if (prop.datatype === 'string') {
            props_out[prop.name] = prop.example
        } else if (prop.datatype === 'number') {
            props_out[prop.name] = parseInt(prop.example)
        } else if (prop.datatype === 'boolean') {
            props_out[prop.name] = prop.example === 'true' ? true : false
        }
    })
-%>
<%- JSON.stringify(props_out, null, 2).split('\n').map(line => '      ' + line).join('\n') %>

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "201"
    - expression: res.headers["content-type"]
      operator: contains
      value: application/vnd.api+json
    - expression: res.headers["cache-control"]
      operator: isNotEmpty
    - expression: res.body
      operator: isJson
    - expression: res.body.id
      operator: gte
      value: "12000000"
  scripts:
    - type: tests
      code: |-
        test("both timestamps should be identical", function () {
          const data = res.getBody()
          expect(data.attributes.created_at).to.eql(data.attributes.updated_at)
        })
