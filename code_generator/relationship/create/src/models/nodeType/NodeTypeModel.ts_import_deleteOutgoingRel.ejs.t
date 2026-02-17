---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport const
skip_if: import {deleteOutgoingRel} from
---
<% if (cardinality === '1:1' || cardinality === 'n:1') { %>
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"
<% } -%>