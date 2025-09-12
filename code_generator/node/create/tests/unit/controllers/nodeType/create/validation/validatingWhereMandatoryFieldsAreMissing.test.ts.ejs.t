---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validatingWhereMandatoryFieldsAreMissing.test.ts
---
<%
    props = []
    for (prop in properties) {
        if (properties[prop].mandatory) {
            props.push(prop + ': undefined')
        } else if (properties[prop].datatype === 'string') {
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

test('validating a request where mandatory fields are missing', async () => {
    const data: Create<%= h.changeCase.pascal(nodeType) %>RawInput = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
