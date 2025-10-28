---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/sanitizing-user-input.test.ts
---
<%
    props_in = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props_in.push(prop + ': "   ' + properties[prop].example + '  "')
        } else if (!properties[prop].example) {
            props_in.push(prop + ': null')
        } else {
            props_in.push(prop + ': ' + properties[prop].example)
        }
    }

    props_out = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props_out.push(prop + ': "' + properties[prop].example + '"')
        } else if (!properties[prop].example) {
            props_out.push(prop + ': null')
        } else {
            props_out.push(prop + ': ' + properties[prop].example)
        }
    }
-%>
import {describe, expect, test} from 'vitest'
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {sanitize} from "../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: Create<%= h.changeCase.pascal(nodeType) %>Input = {
    <%- props_in.map(line => '        ' + line).join(',\n') %>,
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
    <%- props_out.map(line => '            ' + line).join(',\n') %>,
            })
    })
})
