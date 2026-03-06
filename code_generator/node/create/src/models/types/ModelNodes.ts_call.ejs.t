---
inject: true
to: src/models/types/ModelNodes.ts
after: "ModelNodes"
skip_if: "<%= h.changeCase.pascal(nodeType) %>Node "
---
    <%= h.changeCase.pascal(nodeType) %>Node |