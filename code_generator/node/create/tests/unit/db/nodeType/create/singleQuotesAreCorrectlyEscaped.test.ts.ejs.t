---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/singleQuotesAreCorrectlyEscaped.test.ts
---
<%
    props_in = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string') {
            props_in.push(prop + ': "\'' + properties[prop].example + '"')
        } else {
            props_in.push(prop + ': null')
        }
    }

    props_out = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string') {
            props_out.push('            "  ' + prop + ": '\\\\'" + properties[prop].example + "'")
        } else {
            props_out.push('            "  ' + prop + ": null")
        }
    }
-%>
import {expect, test} from 'vitest'
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {createNodeQuery} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"

test('single quotes are correctly escaped', async () => {
    const data: Input<%= h.changeCase.pascal(nodeType) %>Create = {
<%- props_in.map(line => '        ' + line).join(',\n') %>
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:<%= h.changeCase.pascal(nodeType) %> {\n" +
<%- props_out.join(',\\n" +\n') %>\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
