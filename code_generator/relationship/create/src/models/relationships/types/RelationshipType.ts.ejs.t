---
inject: true
to: src/models/relationships/types/RelationshipType.ts
before: ImageBelongsToNode
skip_if: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= h.changeCase.constant(relationshipName) %>',