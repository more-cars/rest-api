---
inject: true
to: src/controllers/nodes/convertModelNodeToControllerNode.ts
before: "ImageNode"
skip_if: "import type {<%= h.changeCase.pascal(startNodeType) %>Node} from"
---
import type {<%= h.changeCase.pascal(startNodeType) %>Node} from "../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Node"