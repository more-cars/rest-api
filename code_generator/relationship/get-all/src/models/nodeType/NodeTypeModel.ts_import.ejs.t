---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport class
skip_if: import {getAllRels} from
---
import {getAllRels} from "../relationships/getAllRels"