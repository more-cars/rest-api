---
inject: true
to: src/db/relationships/getRelationshipSpecification.ts
before: \nexport
skip_if: import {<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification} from
---
import {<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification} from "../nodes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification"