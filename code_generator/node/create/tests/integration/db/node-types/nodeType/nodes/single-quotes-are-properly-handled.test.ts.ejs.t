---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/single-quotes-are-properly-handled.test.ts
---
<% const properties = JSON.parse(props) -%>
import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
<% properties.forEach(prop => { -%>
<%    if (prop.datatype === 'string' && prop.example) { -%>
        <%= prop.name %>: "'<%= prop.example %>''",
<%   } else if (!prop.example) { -%>
        <%= prop.name -%>: null,
<%   } else { -%>
        <%= prop.name %>: <%= prop.example -%>,
<%   } -%>
<% }) -%>
    }

    const createdNode = await createDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data) as <%= h.changeCase.pascal(nodeType) %>Node

<% properties.forEach(prop => { -%>
<%    if (prop.datatype === 'string' && prop.example) { %>
    expect(createdNode.properties.<%= prop.name %>)
        .toEqual("'<%= prop.example %>''")
<%    } -%>
<% }) -%>
})
