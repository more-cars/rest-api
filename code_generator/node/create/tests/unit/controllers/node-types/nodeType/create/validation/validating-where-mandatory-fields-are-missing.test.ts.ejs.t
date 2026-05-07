---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/validation/validating-where-mandatory-fields-are-missing.test.ts
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
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const result = validateInputData(data, NodeType.<%= h.changeCase.pascal(nodeType) %>)

    expect(result)
        .toBeFalsy()
})
