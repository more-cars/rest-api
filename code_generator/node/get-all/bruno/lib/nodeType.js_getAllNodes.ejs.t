---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
after: "exports.create<%= h.changeCase.pascal(nodeType) %> = create<%= h.changeCase.pascal(nodeType) %>"
skip_if: exports.getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>
---
exports.getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = async function () {
    return submitGetRequest("/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>")
}
