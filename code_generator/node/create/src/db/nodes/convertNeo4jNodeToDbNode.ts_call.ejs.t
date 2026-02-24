---
inject: true
to: src/db/nodes/convertNeo4jNodeToDbNode.ts
before: "Neo4jNodeType.Image,"
skip_if: "[Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>, convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode],