---
inject: true
to: src/controllers/types/RelationType.ts
before: ImageBelongsToNode
skip_if: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= h.changeCase.kebab(startNodeType) %>-<%= h.changeCase.kebab(relationshipName) %>',