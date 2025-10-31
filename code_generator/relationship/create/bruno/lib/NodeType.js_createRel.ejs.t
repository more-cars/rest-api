---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js
before: async function
skip_if: async function create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
---
exports.ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists = async function ensure<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>RelationshipExists() {
    await this.ensureValid<%= h.changeCase.pascal(startNodeType) %>Exists()
    await ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists()
    await this.create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship(bru.getEnvVar('valid<%= h.changeCase.pascal(startNodeType) %>Id'), bru.getEnvVar('valid<%= h.changeCase.pascal(endNodeType) %>Id'))
}

exports.create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = async function create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id) {
    return submitPostRequest("/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/" + <%= h.changeCase.camel(startNodeType) %>Id + "/<%= h.changeCase.kebab(relationshipName) %>/" + <%= h.changeCase.camel(endNodeType) %>Id)
}
