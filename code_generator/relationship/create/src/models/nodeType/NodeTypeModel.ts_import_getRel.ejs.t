---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship} from
---
import {getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship"