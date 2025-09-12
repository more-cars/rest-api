---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshallingWhereMandatoryFieldsAreMissing.test.ts
---
<%
    props = []
    for (prop in properties) {
        props.push(prop + ': undefined')
    }
-%>
import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
