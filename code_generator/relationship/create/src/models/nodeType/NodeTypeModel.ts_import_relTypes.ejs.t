---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport const
skip_if: import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from
---
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "./types/<%= h.changeCase.pascal(startNodeType) %>Relationship"