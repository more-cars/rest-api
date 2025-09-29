---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js
before: async function
skip_if: async function create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
---
async function create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/" + <%= h.changeCase.camel(startNodeType) %>Id + "/<%= h.changeCase.kebab(relationshipName) %>/" + <%= h.changeCase.camel(endNodeType) %>Id)
    return response.data
}

exports.create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = create<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship
