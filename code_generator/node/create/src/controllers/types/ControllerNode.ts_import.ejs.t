---
inject: true
to: src/controllers/types/ControllerNode.ts
before: "ImageNode"
skip_if: "<%= h.changeCase.pascal(nodeType) %>Node |"
---
import type {<%= h.changeCase.pascal(nodeType) %>Node} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"