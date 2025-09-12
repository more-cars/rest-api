---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshallingCompleteAndValidInput.test.ts
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

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
