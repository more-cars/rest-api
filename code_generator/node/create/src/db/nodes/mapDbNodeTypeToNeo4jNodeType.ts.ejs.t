---
inject: true
to: src/db/nodes/mapDbNodeTypeToNeo4jNodeType.ts
before: "DbNodeType.Image,"
skip_if: "<%= h.changeCase.pascal(nodeType) %>, Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [DbNodeType.<%= h.changeCase.pascal(nodeType) %>, Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>],