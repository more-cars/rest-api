---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \nexport const
skip_if: import {deleteNode}
---
import {deleteNode} from "../../../db/nodes/deleteNode"