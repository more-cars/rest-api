---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \nexport class <%= h.changeCase.pascal(nodeType) %>
skip_if: import {getAllNodesOfType} from
---
import {getAllNodesOfType} from "../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAllNodesOfType"