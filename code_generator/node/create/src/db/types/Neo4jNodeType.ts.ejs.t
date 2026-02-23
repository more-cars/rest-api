---
inject: true
to: src/db/types/Neo4jNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.pascal(nodeType) %>",