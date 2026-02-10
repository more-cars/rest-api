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
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>/{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}"

runtime:
  assertions:
    - expression: res.status
      operator: eq
      value: "201"
    - expression: res.body
      operator: isJson
    - expression: res.body.data
      operator: isJson
    - expression: res.body.data.relationship_id
      operator: gte
      value: "12000000"
    - expression: res.body.data.relationship_name
      operator: eq
      value: "<%= h.changeCase.kebab(relationshipName) %>"
    - expression: res.body.data.relationship_partner
      operator: isJson
    - expression: res.body.data.relationship_partner.node_type
      operator: eq
      value: "<%= h.changeCase.kebab(endNodeType) %>"
    - expression: res.body.data.relationship_partner.data.id
      operator: eq
      value: "{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}"
    - expression: res.body.data.created_at
      operator: isString
    - expression: res.body.data.created_at
      operator: isNotEmpty
    - expression: res.body.data.updated_at
      operator: isString
    - expression: res.body.data.updated_at
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js')
        const <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.create()
        await <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.create()
