---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: import {get<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {get<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"