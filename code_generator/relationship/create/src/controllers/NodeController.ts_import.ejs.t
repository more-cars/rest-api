---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: import {create<%= h.changeCase.pascal(relationshipName) %>Relation}
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation"