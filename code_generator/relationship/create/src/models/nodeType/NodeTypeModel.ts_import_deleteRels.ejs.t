---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class <%= h.changeCase.pascal(startNodeType) %>
skip_if: import {delete<%= h.changeCase.pascal(relationshipName) %>Relationships} from
---
<% if (cardinality === '1:1' || cardinality === 'n:1') { %>
import {delete<%= h.changeCase.pascal(relationshipName) %>Relationships} from "./delete<%= h.changeCase.pascal(relationshipName) %>Relationships"
<% } %>