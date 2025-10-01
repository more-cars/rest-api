---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \nexport class
skip_if: import {deleteNode}
---
import {deleteNode} from "./<%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>/deleteNode"