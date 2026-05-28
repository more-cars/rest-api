---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Create ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).yml
---
info:
  name: Create ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (valid data)
  type: http
  tags:
    - create
    - relation
    - valid

http:
  method: POST
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/relationships/<%= h.changeCase.kebab(relationshipName) %>"
  body:
    type: json
    data: |-
      {
        "data": {
          "type": "<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>",
          "id": "{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}"
        }
      }

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "204"
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js')
        const <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.create()
        await <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.create()
    - type: after-response
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js')
        const <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.delete(bru.getEnvVar('valid<%= h.changeCase.pascal(startNodeType) %>Id'))
        await <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.delete(bru.getEnvVar('valid<%= h.changeCase.pascal(endNodeType) %>Id'))
