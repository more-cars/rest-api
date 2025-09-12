---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshallingInputWithInvalidDataTypes.test.ts
---
<%
    props = []
    for (prop in properties) {
        props.push(prop + ': true')
    }
-%>
import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
