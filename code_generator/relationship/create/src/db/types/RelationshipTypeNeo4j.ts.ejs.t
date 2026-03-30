---
inject: true
to: src/db/types/RelationshipTypeNeo4j.ts
before: "ImageBelongsToNode"
skip_if: "<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
    <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %> = '<%= forwardRelationshipName !== "false" ? h.changeCase.constant(forwardRelationshipName) : h.changeCase.constant(relationshipName) %>',