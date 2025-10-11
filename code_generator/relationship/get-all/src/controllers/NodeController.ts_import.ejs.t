---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class
skip_if: import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations}
---
import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relations"