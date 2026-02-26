---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \nexport const
skip_if: import {getById}
---
import {getById} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getById"