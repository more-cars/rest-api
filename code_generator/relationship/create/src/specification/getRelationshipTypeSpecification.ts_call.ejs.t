---
inject: true
to: src/specification/getRelationshipTypeSpecification.ts
before: "ImageRelationshipSpecification,"
skip_if: "<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification,"
---
        <%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification,