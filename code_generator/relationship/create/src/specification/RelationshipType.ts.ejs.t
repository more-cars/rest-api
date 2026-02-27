---
inject: true
to: src/specification/RelationshipType.ts
before: "ImageBelongsToNode"
skip_if: "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= h.changeCase.title(startNodeType) %> <%= h.changeCase.title(relationshipName) %>',