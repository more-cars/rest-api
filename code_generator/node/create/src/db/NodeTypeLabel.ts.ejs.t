---
inject: true
to: src/db/NodeTypeLabel.ts
before: \}
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.pascal(nodeType) %>",