---
inject: true
to: src/models/node-types/mapModelNodeTypeToDbNodeType.ts
before: "ModelNodeType.Image"
skip_if: "ModelNodeType.<%= h.changeCase.pascal(startNodeType) %>"
---
        [ModelNodeType.<%= h.changeCase.pascal(startNodeType) %>, DbNodeType.<%= h.changeCase.pascal(startNodeType) %>],