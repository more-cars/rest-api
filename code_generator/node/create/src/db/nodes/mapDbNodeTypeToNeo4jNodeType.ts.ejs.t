---
inject: true
to: src/db/nodes/mapToDbNodeTypeToNeo4jNodeType.ts
before: "DbNodeType.Image,"
skip_if: "[DbNodeType.<%= h.changeCase.pascal(nodeType) %>,"
---
        [DbNodeType.<%= h.changeCase.pascal(nodeType) %>, Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>],