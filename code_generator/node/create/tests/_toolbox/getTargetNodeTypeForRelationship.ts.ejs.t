---
inject: true
to: tests/_toolbox/getTargetNodeTypeForRelationship.ts
before: const match
skip_if: NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, new Map
---
    relationships.set(
        NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>, new Map([
        ]))
