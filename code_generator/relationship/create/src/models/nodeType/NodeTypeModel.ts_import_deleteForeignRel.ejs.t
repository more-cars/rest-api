---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {deleteForeign<%= h.changeCase.pascal(relationshipName) %>Relationship} from
---
<% if (cardinality === '1:1' || cardinality === 'n:1') { %>
import {deleteForeign<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./deleteForeign<%= h.changeCase.pascal(relationshipName) %>Relationship"
<% } %>