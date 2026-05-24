---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-complete-and-valid-input.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_out = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_out.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.example) {
            props_out.push(prop.name + ': null')
        } else {
            props_out.push(prop.name + ': ' + prop.example)
        }
    })
-%>
import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
<%- props_out.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshalInputData(data, [
<%- properties.map(prop => '        ' + `'${prop.name}'`).join(',\n') %>,
    ])

    expect(result)
        .toStrictEqual({
<%- props_out.map(line => '            ' + line).join(',\n') %>,
        })
})
