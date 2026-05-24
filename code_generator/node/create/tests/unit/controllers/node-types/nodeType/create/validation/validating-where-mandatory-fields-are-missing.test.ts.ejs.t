---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-where-mandatory-fields-are-missing.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_out = []
    properties.forEach(prop => {
        if (prop.mandatory) {
            props_out.push(prop.name + ': undefined')
        } else if (prop.datatype === 'string') {
            props_out.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.example) {
            props_out.push(prop.name + ': null')
        } else {
            props_out.push(prop.name + ': ' + prop.example)
        }
    })
-%>
import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
<%- props_out.map(line => '        ' + line).join(',\n') %>,
    }

    const result = validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>)

    expect(result)
        .toBeFalsy()
})
