---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/marshalling/marshallingCompleteAndValidInput.test.ts
---
<%
    let props = []
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
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {marshal} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshal"

test('marshalling a complete and valid request', async () => {
    const node: <%= h.changeCase.pascal(nodeType) %>Node = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
<%- props.map(line => '        ' + line).join(',\n') %>,
    }

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
<%- props.map(line => '            ' + line).join(',\n') %>,
        })
})
