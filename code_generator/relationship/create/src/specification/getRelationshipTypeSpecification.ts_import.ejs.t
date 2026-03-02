---
inject: true
to: src/specification/getRelationshipTypeSpecification.ts
before: "ImageRelationshipSpecification"
skip_if: "import {<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification} from"
---
import {<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification} from "./node-types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification"