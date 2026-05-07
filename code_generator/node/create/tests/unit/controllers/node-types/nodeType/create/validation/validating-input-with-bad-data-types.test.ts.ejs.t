---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-input-with-bad-data-types.test.ts
---
import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
<%
    props = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props.push('"' + (properties[prop].example || 'nope') + '"')
        } else {
            props.push(properties[prop].example || 0.01)
        }
    }
-%>
<% for (let i = 0; i < props.length; i++) { -%>
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
    const data = {
<% for (prop in properties) { -%>
        <%= prop %>,
<% } -%>
    }

    const result = validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>)

    expect(result)
        .toBeFalsy()
})
