---
inject: true
to: src/specification/mapDbNodeTypeToNodeType.ts
before: "DbNodeType.Image,"
skip_if: "<%= h.changeCase.pascal(nodeType) %>, NodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [DbNodeType.<%= h.changeCase.pascal(nodeType) %>, NodeType.<%= h.changeCase.pascal(nodeType) %>],