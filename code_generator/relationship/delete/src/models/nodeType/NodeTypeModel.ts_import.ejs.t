---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {delete<%= h.changeCase.pascal(relationshipName) %>Relationship}
---
import {delete<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./delete<%= h.changeCase.pascal(relationshipName) %>Relationship"