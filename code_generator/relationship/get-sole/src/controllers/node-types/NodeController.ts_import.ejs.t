---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport const
skip_if: import {get<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {get<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"