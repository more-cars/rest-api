---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class <%= h.changeCase.pascal(startNodeType) %>
skip_if: import {<%= h.changeCase.pascal(endNodeType) %>} from
---
import {<%= h.changeCase.pascal(endNodeType) %>} from "../<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/<%= h.changeCase.pascal(endNodeType) %>"