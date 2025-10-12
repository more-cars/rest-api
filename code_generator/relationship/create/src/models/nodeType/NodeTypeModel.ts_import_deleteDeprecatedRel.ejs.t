---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {deleteDeprecatedRelationship} from
---
<% if (cardinality === '1:1' || cardinality === 'n:1' || cardinality === '1:n') { %>
import {deleteDeprecatedRelationship} from "./deleteDeprecatedRelationship"
<% } %>