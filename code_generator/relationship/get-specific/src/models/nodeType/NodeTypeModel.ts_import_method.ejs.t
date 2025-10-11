---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
after: from "./get<%= h.changeCase.pascal(relationshipName) %>Relationship"
skip_if: "./has<%= h.changeCase.pascal(relationshipName) %>Relationship"
---
import {has<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./has<%= h.changeCase.pascal(relationshipName) %>Relationship"