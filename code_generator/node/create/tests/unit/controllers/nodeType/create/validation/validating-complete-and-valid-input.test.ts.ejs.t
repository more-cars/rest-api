---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-complete-and-valid-input.test.ts
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
import {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"
import {validate} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

test('validating a complete and valid request', async () => {
    const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
