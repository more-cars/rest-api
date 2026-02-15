---
inject: true
to: src/db/relationships/getRelationshipSpecification.ts
before: "))"
skip_if: "<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification,"
---
        <%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification,