---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-input-with-bad-data-types.test.ts
---
import {expect, test} from 'vitest'
import {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"
import {validate} from "../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

test.each([
<%
    props = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string') {
            props.push(properties[prop].example || 'nope')
        } else {
            props.push(properties[prop].example || 0.01)
        }
    }
-%>
<% for (let i = 0; i < properties.length; i++) { -%>
<%  const originalValue = props[i] -%>
<%  props[i] = false -%>
    [<%- props.join(', ') %>],
<%  props[i] = originalValue -%>
<% } -%>
])('validating a request where the fields have invalid data types', async (
<% for (prop in properties) { -%>
    <%= prop %>,
<% } -%>
) => {
    const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<% for (prop in properties) { -%>
        <%= prop %>,
<% } -%>
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
