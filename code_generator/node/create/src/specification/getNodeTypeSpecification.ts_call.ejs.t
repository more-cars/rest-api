---
inject: true
to: src/specification/getNodeTypeSpecification.ts
before: "NodeType.Image,"
skip_if: "<%= h.changeCase.pascal(nodeType) %>, <%= h.changeCase.pascal(nodeType) %>NodeSpecification"
---
        [NodeType.<%= h.changeCase.pascal(nodeType) %>, <%= h.changeCase.pascal(nodeType) %>NodeSpecification],