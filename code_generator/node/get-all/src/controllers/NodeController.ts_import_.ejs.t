---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \nexport class
skip_if: import {getAll}
---
import {getAll} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll"