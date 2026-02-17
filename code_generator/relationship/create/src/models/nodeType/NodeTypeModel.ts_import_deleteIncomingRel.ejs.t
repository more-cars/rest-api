---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport const
skip_if: import {deleteIncomingRel} from
---
<% if (cardinality === '1:1' || cardinality === '1:n') { %>
import {deleteIncomingRel} from "../relationships/deleteIncomingRel"
<% } -%>