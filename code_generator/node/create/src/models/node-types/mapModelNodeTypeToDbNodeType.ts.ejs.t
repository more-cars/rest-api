---
inject: true
to: src/models/node-types/mapModelNodeTypeToDbNodeType.ts
before: "ModelNodeType.Image"
skip_if: "ModelNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [ModelNodeType.<%= h.changeCase.pascal(nodeType) %>, DbNodeType.<%= h.changeCase.pascal(nodeType) %>],