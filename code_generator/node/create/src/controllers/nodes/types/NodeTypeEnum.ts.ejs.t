---
inject: true
to: src/controllers/nodes/types/NodeTypeEnum.ts
before: IMAGE
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.lower(nodeType) %>",