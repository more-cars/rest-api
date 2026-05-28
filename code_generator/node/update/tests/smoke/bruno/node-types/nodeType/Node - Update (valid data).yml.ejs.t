---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/Node - Update (valid data).yml
---
<% const properties = JSON.parse(props) -%>
info:
  name: Update <%= h.changeCase.title(nodeType) %> (valid data)
  type: http
  tags:
    - update
    - node
    - valid

http:
  method: PATCH
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"
  body:
    type: json
    data: |-
      {
<% properties.forEach(prop => { -%>
<%   if (!prop.example) { -%>
        "<%= prop.name %>": null,
<%   } else if (prop.datatype === 'string') { -%>
        "<%= prop.name %>": "<%= prop.example %> - Updated",
<%   } else { -%>
        "<%= prop.name %>": <%= prop.example + 2 -%>,
<%   } -%>
<% }) -%>
      }

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "200"
    - expression: res.headers["content-type"]
      operator: contains
      value: application/vnd.api+json
    - expression: res.headers["cache-control"]
      operator: isNotEmpty
    - expression: res.body
      operator: isJson
    - expression: res.body.id
      operator: eq
      value: "{{valid<%= h.changeCase.pascal(nodeType) %>Id}}"
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.create()
    - type: tests
      code: |-
        test("response should return the intended record", function () {
          const data = res.getBody()
          expect(data.id).to.eql(bru.getEnvVar('valid<%= h.changeCase.pascal(nodeType) %>Id'))
        })
        test("both timestamps should be different", function () {
          const data = res.getBody()
          expect(data.attributes.created_at).to.not.eql(data.attributes.updated_at)
        })
