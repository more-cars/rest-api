---
inject: true
to: src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType.ts
before: "RelationshipType.NodeHasImage"
skip_if: "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
        [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelationshipTypeNeo4j.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],