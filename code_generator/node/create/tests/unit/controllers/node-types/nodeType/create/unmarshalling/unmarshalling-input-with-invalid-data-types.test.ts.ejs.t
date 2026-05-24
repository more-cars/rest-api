---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-input-with-invalid-data-types.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_out = []
    properties.forEach(prop => {
        props_out.push(prop.name + ': true')
    })
-%>
import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
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
