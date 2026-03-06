---
inject: true
to: src/models/types/ModelNodes.ts
before: "ImageNode"
skip_if: "import type {<%= h.changeCase.pascal(nodeType) %>Node} from"
---
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"