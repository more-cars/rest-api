---
to: tests/unit/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/sanitizing-user-input.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_in = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_in.push(prop.name + ': "   ' + prop.example + '  "')
        } else if (!prop.example) {
            props_in.push(prop.name + ': null')
        } else {
            props_in.push(prop.name + ': ' + prop.example)
        }
    })

    props_out = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_out.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.example) {
            props_out.push(prop.name + ': null')
        } else {
            props_out.push(prop.name + ': ' + prop.example)
        }
    })
-%>
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>Input} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Input"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: <%= h.changeCase.pascal(nodeType) %>Input = {
<%- props_in.map(line => '            ' + line).join(',\n') %>,
        }

        const result = unmarshalInputData(data, [
<%- properties.map(prop => '            ' + `'${prop.name}'`).join(',\n') %>,
        ])

        expect(result)
            .toStrictEqual({
<%- props_out.map(line => '                ' + line).join(',\n') %>,
            })
    })
})
