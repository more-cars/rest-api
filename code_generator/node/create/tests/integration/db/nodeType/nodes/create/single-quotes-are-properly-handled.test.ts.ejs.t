---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create/single-quotes-are-properly-handled.test.ts
---
import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"

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

    const createdNode = await createNode(data)
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string' && properties[prop].example) { %>
    expect(createdNode.<%= prop %>)
        .toEqual("'<%= properties[prop].example %>''")
<%    } -%>
<% } -%>
})
