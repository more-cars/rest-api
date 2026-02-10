---
to: tests/smoke/bruno/lib/node-types/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
---
const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>", {
        name: 'Dummy <%= h.changeCase.title(nodeType) %>',
    })
    const <%= h.changeCase.camel(nodeType) %> = response.data
    bru.setEnvVar('valid' + prefix + '<%= h.changeCase.pascal(nodeType) %>Id', <%= h.changeCase.camel(nodeType) %>.id)

    return <%= h.changeCase.camel(nodeType) %>
}
