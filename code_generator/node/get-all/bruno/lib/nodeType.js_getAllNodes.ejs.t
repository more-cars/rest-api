---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
before: async function
skip_if: async function getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()
---
async function getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>() {
    return submitGetRequest("/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>")
}

exports.getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>