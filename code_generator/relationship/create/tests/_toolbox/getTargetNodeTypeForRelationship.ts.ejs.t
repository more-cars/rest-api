---
inject: true
to: tests/_toolbox/getTargetNodeTypeForRelationship.ts
after: NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>, new Map
skip_if: RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
            [RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>],