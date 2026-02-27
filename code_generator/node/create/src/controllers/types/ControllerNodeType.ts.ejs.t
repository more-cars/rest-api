---
inject: true
to: src/controllers/types/ControllerNodeType.ts
before: Image
skip_if: <%= h.changeCase.pascal(nodeType) %>
---
    <%= h.changeCase.pascal(nodeType) %> = "<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>",