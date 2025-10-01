---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \nexport class
skip_if: import {getNodeById} from
---
import {getNodeById} from "../../db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById"