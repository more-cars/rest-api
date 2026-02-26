---
inject: true
to: src/controllers/types/ControllerNode.ts
after: ControllerNode
skip_if: "<%= h.changeCase.pascal(nodeType) %>Node "
---
    <%= h.changeCase.pascal(nodeType) %>Node |