---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \nexport class <%= h.changeCase.pascal(nodeType) %>Controller
skip_if: import {getById}
---
import {getById} from "./<%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>/getById"