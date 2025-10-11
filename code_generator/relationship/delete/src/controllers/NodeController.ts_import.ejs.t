---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: import {delete<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {delete<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/delete<%= h.changeCase.pascal(relationshipName) %>Relation"