---
inject: true
to: tests/_toolbox/types/ExpectedNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.title(nodeType) %>",