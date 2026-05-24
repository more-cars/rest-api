---
to: tests/unit/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/escaping-single-quotes.test.ts
---
<% const properties = JSON.parse(props) -%>
<%
    props_in = []
    properties.forEach(prop => {
        if (prop.datatype === 'string') {
            props_in.push(prop.name + ': "\'' + prop.example + '"')
        } else if (prop.datatype === 'number' && prop.mandatory) {
            props_in.push(prop.name + ': ' + prop.example)
        } else {
            props_in.push(prop.name + ': null')
        }
    })

    props_out = []
    properties.forEach(prop => {
        if (prop.datatype === 'string') {
            props_out.push('            "  ' + prop.name + ": '\\\\'" + prop.example + "'")
        } else if (prop.datatype === 'number' && prop.mandatory) {
            props_out.push('            "  ' + prop.name + ": " + prop.example)
        } else {
            props_out.push('            "  ' + prop.name + ": null")
        }
    })
-%>
import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
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
