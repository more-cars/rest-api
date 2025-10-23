---
inject: true
to: src/controllers/nodes/types/NodeTypeEnum.ts
before: IMAGE
skip_if: <%= h.changeCase.constant(nodeType) %>
---
    <%= h.changeCase.constant(nodeType) %> = "<%= h.changeCase.lower(nodeType) %>",