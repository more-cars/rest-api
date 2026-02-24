---
inject: true
to: src/models/types/ModelNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.snake(nodeType) %>",