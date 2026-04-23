---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/single-quotes-are-properly-handled.test.ts
---
import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string' && properties[prop].example) { -%>
        <%= prop %>: "'<%= properties[prop].example %>''",
<%   } else if (!properties[prop].example) { -%>
        <%= prop -%>: null,
<%   } else { -%>
        <%= prop %>: <%= properties[prop].example -%>,
<%   } -%>
<% } -%>
    }

    const createdNode = await createNeo4jNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, data) as <%= h.changeCase.pascal(nodeType) %>Node

<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string' && properties[prop].example) { %>
    expect(createdNode.properties.<%= prop %>)
        .toEqual("'<%= properties[prop].example %>''")
<%    } -%>
<% } -%>
})
