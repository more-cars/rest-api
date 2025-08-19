---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodetype) %>Controller.ts
after: ./<%= h.inflection.pluralize(h.changeCase.camel(nodetype)) %>/getAll
skip_if: import {deleteNode}
---
import {deleteNode} from "./<%= h.inflection.pluralize(h.changeCase.camel(nodetype)) %>/deleteNode"