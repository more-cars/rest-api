---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js
before: async function
skip_if: async function ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists
---
async function ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists() {
    await ensureValid<%= h.changeCase.pascal(startNodeType) %>Exists()
    await ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists()
    await create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship(bru.getEnvVar('valid<%= h.changeCase.pascal(startNodeType) %>Id'), bru.getEnvVar('valid<%= h.changeCase.pascal(endNodeType) %>Id'))
}

exports.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists = ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists
