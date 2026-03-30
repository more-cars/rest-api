---
inject: true
to: src/db/relationships/mapNeo4jRelationshipTypeToDbRelationshipType.ts
after: "// <%= h.changeCase.title(startNodeType) %> - <%= forwardRelationshipName !== 'false' ? 'Reverse' : 'Forward' %>"
skip_if: "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
                [RelationshipTypeNeo4j.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],