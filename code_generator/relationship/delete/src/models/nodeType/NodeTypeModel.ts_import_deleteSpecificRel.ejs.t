---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {deleteSpecificRel} from
---
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"