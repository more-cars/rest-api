---
inject: true
to: tests/smoke/bruno/lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js
before: "exports.create "
skip_if: exports.create<%= h.changeCase.pascal(relationshipName) %>Relationship
---
exports.create<%= h.changeCase.pascal(relationshipName) %>Relationship = async function () {
    await post("/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/" + bru.getEnvVar('valid<%= h.changeCase.pascal(startNodeType) %>Id') + "/relationships/<%= h.changeCase.kebab(relationshipName) %>", {
        data: {
            type: "<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>",
            id: bru.getEnvVar('valid<%= h.changeCase.pascal(endNodeType) %>Id'),
        },
    })
}
