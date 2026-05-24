---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-where-mandatory-fields-are-missing.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_in = []
    properties.forEach(prop => {
        if (!prop.mandatory && prop.datatype === 'string') {
            props_in.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.mandatory) {
            props_in.push(prop.name + ': ' + prop.example)
        }
    })

    props_out = []
    properties.forEach(prop => {
        if (!prop.mandatory && prop.datatype === 'string') {
            props_out.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.mandatory) {
            props_out.push(prop.name + ': ' + prop.example)
        } else {
            props_out.push(prop.name + ': undefined')
        }
    })
-%>
import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
<%- props_in.map(line => '        ' + line).join(',\n') %>
    }

    const result = unmarshalInputData(data, [
<%- properties.map(prop => '        ' + `'${prop.name}'`).join(',\n') %>,
    ])

    expect(result)
        .toStrictEqual({
<%- props_out.map(line => '            ' + line).join(',\n') %>
        })
})
