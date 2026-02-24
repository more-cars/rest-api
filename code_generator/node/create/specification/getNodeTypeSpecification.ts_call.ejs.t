---
inject: true
to: src/specification/getNodeTypeSpecification.ts
before: "NodeType.Image,"
skip_if: "[NodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [NodeType.<%= h.changeCase.pascal(nodeType) %>, <%= h.changeCase.pascal(nodeType) %>NodeSpecification],