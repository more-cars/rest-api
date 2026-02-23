---
inject: true
to: src/db/types/DbNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.pascal(nodeType) %>",