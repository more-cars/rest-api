---
inject: true
to: src/db/NodeTypeLabel.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.pascal(nodeType) %>",