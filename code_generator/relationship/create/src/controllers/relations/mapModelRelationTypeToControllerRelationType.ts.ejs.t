---
inject: true
to: src/controllers/relations/mapModelRelationTypeToControllerRelationType.ts
before: "ImageIsPrimeImageOfNode"
skip_if: "RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
        [RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, RelationType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>],