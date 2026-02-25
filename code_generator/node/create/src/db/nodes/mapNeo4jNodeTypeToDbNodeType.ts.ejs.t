---
inject: true
to: src/db/nodes/mapNeo4jNodeTypeToDbNodeType.ts
before: "Neo4jNodeType.Image,"
skip_if: "<%= h.changeCase.pascal(nodeType) %>, DbNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>, DbNodeType.<%= h.changeCase.pascal(nodeType) %>],