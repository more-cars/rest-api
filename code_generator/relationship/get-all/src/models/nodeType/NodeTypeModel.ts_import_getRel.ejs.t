---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {getAll<%= h.changeCase.pascal(relationshipName) %>Relationships} from
---
import {getAll<%= h.changeCase.pascal(relationshipName) %>Relationships} from "./getAll<%= h.changeCase.pascal(relationshipName) %>Relationships"