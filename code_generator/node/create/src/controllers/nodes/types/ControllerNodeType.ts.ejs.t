---
inject: true
to: src/controllers/nodes/types/ControllerNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.kebab(nodeType) %>",