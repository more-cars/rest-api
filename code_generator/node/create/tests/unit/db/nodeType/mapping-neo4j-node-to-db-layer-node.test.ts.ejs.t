---
to: tests/unit/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/mapping-neo4j-node-to-db-layer-node.test.ts
---
import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string' && properties[prop].example) { -%>
            <%= prop %>: "<%= properties[prop].example %>",
<%   } else if (!properties[prop].example) { -%>
            <%= prop -%>: null,
<%   } else { -%>
            <%= prop %>: <%= properties[prop].example -%>,
<%   } -%>
<% } -%>
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeTo<%= h.changeCase.pascal(nodeType) %>Node(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
<% for (prop in properties) { -%>
<%    if (properties[prop].datatype === 'string' && properties[prop].example) { -%>
            <%= prop %>: "<%= properties[prop].example %>",
<%   } else if (!properties[prop].example) { -%>
            <%= prop -%>: null,
<%   } else { -%>
            <%= prop %>: <%= properties[prop].example -%>,
<%   } -%>
<% } -%>
        })
})
