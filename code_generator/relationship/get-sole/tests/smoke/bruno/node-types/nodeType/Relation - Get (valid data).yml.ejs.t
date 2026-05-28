---
to: tests/smoke/bruno/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/Relation - Get ›<%= h.changeCase.kebab(relationshipName) %>‹ (valid data).yml
---
info:
  name: Get ›<%= h.changeCase.kebab(relationshipName) %>‹ relation (valid data)
  type: http
  tags:
    - get
    - relation
    - valid

http:
  method: GET
  url: "{{baseUrl}}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>"

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
    - expression: res.body.data
      operator: isJson
    - expression: res.body.data.id
      operator: eq
      value: "{{valid<%= h.changeCase.pascal(endNodeType) %>Id}}"
    - expression: res.body.data.type
      operator: eq
      value: "<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>"
    - expression: res.body.data.attributes
      operator: isJson
    - expression: res.body.links.self
      operator: eq
      value: "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/{{valid<%= h.changeCase.pascal(startNodeType) %>Id}}/<%= h.changeCase.kebab(relationshipName) %>"
    - expression: res.body.data.attributes.created_at
      operator: isString
    - expression: res.body.data.attributes.created_at
      operator: isNotEmpty
    - expression: res.body.data.attributes.updated_at
      operator: isString
    - expression: res.body.data.attributes.updated_at
      operator: isNotEmpty
  scripts:
    - type: before-request
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js')
        const <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.create()
        await <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.create()
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship()
    - type: after-response
      code: |-
        const <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js')
        const <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %> = require('./lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.js')
        await <%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.delete(bru.getEnvVar('valid<%= h.changeCase.pascal(startNodeType) %>Id'))
        await <%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>.delete(bru.getEnvVar('valid<%= h.changeCase.pascal(endNodeType) %>Id'))
