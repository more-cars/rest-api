---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: import {getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation"