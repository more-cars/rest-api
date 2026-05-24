---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-input-with-bad-data-types.test.ts
---
<% const properties = JSON.parse(props) -%>
import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
<%
    props_out = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_out.push('"' + (prop.example || 'nope') + '"')
        } else {
            props_out.push(prop.example || 0.01)
        }
    })
-%>
<% for (let i = 0; i < props_out.length; i++) { -%>
<%  const originalValue = props_out[i] -%>
<%  props_out[i] = false -%>
    [<%- props_out.join(', ') %>],
<%  props_out[i] = originalValue -%>
<% } -%>
])('validating a request where the fields have invalid data types', async (
<% properties.forEach(prop => { -%>
    <%= prop.name %>,
<% }) -%>
) => {
    const data = {
<% properties.forEach(prop => { -%>
        <%= prop.name %>,
<% }) -%>
    }

    const result = validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>)

    expect(result)
        .toBeFalsy()
})
