---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
after: from "./create<%= h.changeCase.pascal(relationshipName) %>Relationship"
skip_if: "./get<%= h.changeCase.pascal(relationshipName) %>Relationship"
---
import {get<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./get<%= h.changeCase.pascal(relationshipName) %>Relationship"