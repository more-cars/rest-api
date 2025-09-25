---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class <%= h.changeCase.pascal(startNodeType) %>Controller
skip_if: import {create<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation"