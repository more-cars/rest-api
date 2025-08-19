---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/<%= h.changeCase.pascal(nodetype) %>.ts
after: import {getAllNodesOfType}
skip_if: import {deleteNode}
---
import {deleteNode} from "../../db/nodes/deleteNode"