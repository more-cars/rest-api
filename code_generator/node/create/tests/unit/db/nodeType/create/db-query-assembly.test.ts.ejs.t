---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/db-query-assembly.test.ts
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
import {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a <%= h.changeCase.upper(nodeType) %> node', async () => {
    const data: Input<%= h.changeCase.pascal(nodeType) %>Create = {
<%- props_in.map(line => '        ' + line).join(',\n') %>
    }

    const query = createNodeQuery(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data)

    expect(query)
        .toEqual(
            "CREATE (node:<%= h.changeCase.pascal(nodeType) %>_" + appInstanceId + " {\n" +
<%- props_out.join(',\\n" +\n') %>\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
