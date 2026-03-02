---
inject: true
to: src/specification/mapNodeTypeToDbNodeType.ts
before: "NodeType.Image"
skip_if: "NodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [NodeType.<%= h.changeCase.pascal(nodeType) %>, DbNodeType.<%= h.changeCase.pascal(nodeType) %>],