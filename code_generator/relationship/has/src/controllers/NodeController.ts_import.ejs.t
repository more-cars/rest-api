---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/has<%= h.changeCase.pascal(relationshipName) %>Relation"
---
import {has<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/has<%= h.changeCase.pascal(relationshipName) %>Relation"