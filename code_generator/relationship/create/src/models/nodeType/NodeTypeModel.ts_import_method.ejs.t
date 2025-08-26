---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: class
skip_if: "./create<%= h.changeCase.pascal(relationshipName) %>Relationship"
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./create<%= h.changeCase.pascal(relationshipName) %>Relationship"