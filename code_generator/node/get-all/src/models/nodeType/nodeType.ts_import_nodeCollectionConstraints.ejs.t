---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \nexport class
skip_if: import type {NodeCollectionConstraints} from
---
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"