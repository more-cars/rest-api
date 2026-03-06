---
inject: true
to: src/controllers/nodes/convertModelNodeToControllerNode.ts
before: "convertImageModelNodeToControllerNode"
skip_if: "import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from"
---
import {convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode"