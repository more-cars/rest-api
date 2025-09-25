---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class <%= h.changeCase.pascal(startNodeType) %>
skip_if: import {create<%= h.changeCase.pascal(relationshipName) %>Relationship} from
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./create<%= h.changeCase.pascal(relationshipName) %>Relationship"