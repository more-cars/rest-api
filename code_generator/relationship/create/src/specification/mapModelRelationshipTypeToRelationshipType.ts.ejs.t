---
inject: true
to: src/specification/mapModelRelationshipTypeToRelationshipType.ts
before: "RelType.ImageBelongsToNode"
skip_if: "RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
        [RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],