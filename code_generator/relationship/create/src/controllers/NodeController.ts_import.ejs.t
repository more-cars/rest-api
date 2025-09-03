---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: class
skip_if: "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation"
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation"
