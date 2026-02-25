---
inject: true
to: src/models/relationships/mapDbRelationshipTypeToModelRelType.ts
before: RelationshipType.ImageBelongsToNode
skip_if: RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
        [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],