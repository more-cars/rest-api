---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshallingRequestWithExtraneousData.test.ts
---
<%
    props = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props.push(prop + ': "' + properties[prop].example + '"')
        } else if (!properties[prop].example) {
            props.push(prop + ': null')
        } else {
            props.push(prop + ': ' + properties[prop].example)
        }
    }
-%>
import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
<%- props.map(line => '        ' + line).join(',\n') %>,
        my_property: "Hello",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
