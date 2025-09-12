---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/cypherQueryIsCorrectlyAssembled.test.ts
---
<%
    props_in = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props_in.push(prop + ': "' + properties[prop].example + '"')
        } else if (!properties[prop].example) {
            props_in.push(prop + ': null')
        } else {
            props_in.push(prop + ': ' + properties[prop].example)
        }
    }

    props_out = []
    for (prop in properties) {
        if (properties[prop].datatype === 'string' && properties[prop].example) {
            props_out.push('            "  ' + prop + ": '" + properties[prop].example + "'")
        } else if (!properties[prop].example) {
            props_out.push('            "  ' + prop + ": null")
        } else {
            props_out.push('            "  ' + prop + ": " + properties[prop].example)
        }
    }
-%>
import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"

test('cypher query is correctly assembled', async () => {
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
