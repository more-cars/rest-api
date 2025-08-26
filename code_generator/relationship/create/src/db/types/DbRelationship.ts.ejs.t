---
inject: true
to: src/db/types/DbRelationship.ts
before: \}
skip_if: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= h.changeCase.constant(relationshipName) %>',