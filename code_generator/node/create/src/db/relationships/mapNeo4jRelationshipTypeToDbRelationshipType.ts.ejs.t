---
inject: true
to: src/db/relationships/mapNeo4jRelationshipTypeToDbRelationshipType.ts
before: "Neo4jNodeType.Image"
skip_if: "Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [Neo4jNodeType.<%= h.changeCase.pascal(nodeType) %>, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // <%= h.changeCase.title(nodeType) %> - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // <%= h.changeCase.title(nodeType) %> - Forward
            ])],
        ])],