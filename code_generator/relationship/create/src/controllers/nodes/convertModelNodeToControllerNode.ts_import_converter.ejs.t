---
inject: true
to: src/controllers/nodes/convertModelNodeToControllerNode.ts
before: "ImageNode"
skip_if: "import {convert<%= h.changeCase.pascal(startNodeType) %>ModelNodeToControllerNode} from"
---
import {convert<%= h.changeCase.pascal(startNodeType) %>ModelNodeToControllerNode} from "../node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/convert<%= h.changeCase.pascal(startNodeType) %>ModelNodeToControllerNode"