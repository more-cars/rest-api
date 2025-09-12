---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshallingWhereOptionalFieldsAreMissing.test.ts
---
<%
    props_in = {}
    for (prop in properties) {
        if (properties[prop].mandatory) {
            props_in[prop] = properties[prop].example
        }
    }

    props_out = []
    for (prop in properties) {
        if (properties[prop].mandatory && properties[prop].datatype === 'string') {
            props_out.push(prop + ': "' + properties[prop].example + '"')
        } else if (properties[prop].mandatory) {
            props_out.push(prop + ': ' + properties[prop].example)
        } else {
            props_out.push(prop + ': undefined')
        }
    }
-%>
import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/unmarshal"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = <%- JSON.stringify(props_in, null, 2).replace(/"([^"]+)":/g, '$1:') %>

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
<%- props_out.map(line => '            ' + line).join(',\n') %>,
        })
})
