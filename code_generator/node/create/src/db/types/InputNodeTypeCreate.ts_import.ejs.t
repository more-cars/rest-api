---
inject: true
to: src/db/types/InputNodeTypeCreate.ts
before: InputImageCreate
skip_if: import type {Input<%= h.changeCase.pascal(nodeType) %>Create} from
---
import type {Input<%= h.changeCase.pascal(nodeType) %>Create} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Input<%= h.changeCase.pascal(nodeType) %>Create"