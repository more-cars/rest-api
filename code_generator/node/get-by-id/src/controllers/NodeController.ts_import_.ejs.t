---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \nexport class
skip_if: import {getById}
---
import {getById} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getById"