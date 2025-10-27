---
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
---
const {submitPostRequest, submitGetRequest} = require("./request")

async function ensureValid<%= h.changeCase.pascal(nodeType) %>Exists() {
    if (!bru.getEnvVar('valid<%= h.changeCase.pascal(nodeType) %>Id')) {
            const newNode = await create<%= h.changeCase.pascal(nodeType) %>()
            bru.setEnvVar("valid<%= h.changeCase.pascal(nodeType) %>Id", newNode.data.id)
    }
}

exports.ensureValid<%= h.changeCase.pascal(nodeType) %>Exists = ensureValid<%= h.changeCase.pascal(nodeType) %>Exists

async function create<%= h.changeCase.pascal(nodeType) %>() {
    return submitPostRequest("/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>", {
<% for (prop in properties) { -%>
    <% if (properties[prop].mandatory && properties[prop].datatype === 'string') { %>
        <%= prop %>: '<%= properties[prop].example -%>',
    <% } else if (properties[prop].mandatory) { %>
        <%= prop %>: <%= properties[prop].example -%>,
    <% } -%>
<% } -%>
    })
}

exports.create<%= h.changeCase.pascal(nodeType) %> = create<%= h.changeCase.pascal(nodeType) %>
