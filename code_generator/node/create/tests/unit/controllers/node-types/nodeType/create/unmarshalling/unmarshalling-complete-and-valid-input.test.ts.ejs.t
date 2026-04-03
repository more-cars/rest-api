---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-complete-and-valid-input.test.ts
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
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/unmarshalInputData"
import type {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "../../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
