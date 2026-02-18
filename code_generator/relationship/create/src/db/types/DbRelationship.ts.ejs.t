---
inject: true
to: src/db/types/RelationshipType.ts
before: \}
skip_if: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= h.changeCase.constant(startNodeType) %>_<%= h.changeCase.constant(relationshipName) %>',