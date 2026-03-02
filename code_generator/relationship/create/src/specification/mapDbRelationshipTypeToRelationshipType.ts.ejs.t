---
inject: true
to: src/specification/mapDbRelationshipTypeToRelationshipType.ts
before: "DbRelationshipType.ImageBelongsToNode"
skip_if: "DbRelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
        [DbRelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],