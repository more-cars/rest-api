---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
after: from "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation"
skip_if: "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"
---
import {get<%= h.changeCase.pascal(relationshipName) %>Relation} from "./<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation"