---
inject: true
to: src/db/types/InputNodeTypeCreate.ts
after: InputNodeTypeCreate
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    Input<%= h.changeCase.pascal(nodeType) %>Create |