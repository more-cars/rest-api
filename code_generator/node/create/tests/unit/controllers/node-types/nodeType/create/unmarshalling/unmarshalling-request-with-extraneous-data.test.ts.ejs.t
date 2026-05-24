---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-request-with-extraneous-data.test.ts
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

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
<%- props_out.map(line => '        ' + line).join(',\n') %>,
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
<%- properties.map(prop => '        ' + `'${prop.name}'`).join(',\n') %>,
    ])

    expect(result)
        .toStrictEqual({
<%- props_out.map(line => '            ' + line).join(',\n') %>,
        })
})
