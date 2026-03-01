---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-input-with-invalid-data-types.test.ts
---
<%
    props = []
    for (prop in properties) {
        props.push(prop + ': true')
    }
-%>
import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
