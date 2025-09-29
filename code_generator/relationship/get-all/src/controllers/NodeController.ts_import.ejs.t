---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \nexport class <%= h.changeCase.pascal(startNodeType) %>Controller
skip_if: import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations} from
---
import {getAll<%= h.changeCase.pascal(relationshipName) %>Relations} from "./<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relations"