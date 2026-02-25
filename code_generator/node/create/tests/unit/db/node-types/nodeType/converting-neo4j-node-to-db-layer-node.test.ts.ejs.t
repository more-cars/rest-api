---
to: tests/unit/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/converting-neo4j-node-to-db-layer-node.test.ts
---
import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"

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
        elementId: "",
    }

    const mappedNode = convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
            properties: {
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
            },
        } satisfies <%= h.changeCase.pascal(nodeType) %>Node)
})
