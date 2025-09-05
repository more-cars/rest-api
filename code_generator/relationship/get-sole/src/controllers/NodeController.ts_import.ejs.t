---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class CarModelController
skip_if: "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"
---
import {get<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"