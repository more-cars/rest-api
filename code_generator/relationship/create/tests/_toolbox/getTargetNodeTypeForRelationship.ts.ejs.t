---
inject: true
to: tests/_toolbox/getTargetNodeTypeForRelationship.ts
after: NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>, new Map
skip_if: RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
            [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>],