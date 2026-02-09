---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport const
skip_if: import {deleteDeprecatedRel} from
---
<% if (cardinality === '1:1' || cardinality === 'n:1' || cardinality === '1:n') { %>
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
<% } -%>