---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport const
skip_if: import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations}
---
import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations} from "./<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relations"