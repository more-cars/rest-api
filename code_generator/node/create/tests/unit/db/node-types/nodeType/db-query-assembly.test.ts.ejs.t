---
to: tests/unit/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/db-query-assembly.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_in = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_in.push(prop.name + ': "' + prop.example + '"')
        } else if (!prop.example) {
            props_in.push(prop.name + ': null')
        } else {
            props_in.push(prop.name + ': ' + prop.example)
        }
    })

    props_out = []
    properties.forEach(prop => {
        if (prop.datatype === 'string' && prop.example) {
            props_out.push('            "  ' + prop.name + ": '" + prop.example + "'")
        } else if (!prop.example) {
            props_out.push('            "  ' + prop.name + ": null")
        } else {
            props_out.push('            "  ' + prop.name + ": " + prop.example)
        }
    })
-%>
import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a <%= h.changeCase.upper(nodeType) %> node', async () => {
    const data: QueryInputData = {
<%- props_in.map(line => '        ' + line).join(',\n') %>
    }

    const query = createNodeQuery(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data)

    expect(query)
        .toEqual(
            "CREATE (n:<%= h.changeCase.pascal(nodeType) %>_A_" + appInstanceId + " {\n" +
<%- props_out.join(',\\n" +\n') %>\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
