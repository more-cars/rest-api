---
inject: true
to: src/db/nodes/convertNeo4jNodeToDbNode.ts
before: default
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
        case Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>:
            return convert<%= h.changeCase.pascal(nodeType) %>Neo4jNodeToDbNode(neo4jNode)