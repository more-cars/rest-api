---
inject: true
to: src/controllers/nodes/convertModelNodeToControllerNode.ts
before: "case ModelNodeType.Image"
skip_if: "case ModelNodeType.<%= h.changeCase.pascal(startNodeType) %>"
---
        case ModelNodeType.<%= h.changeCase.pascal(startNodeType) %>:
            return convert<%= h.changeCase.pascal(startNodeType) %>ModelNodeToControllerNode(modelNode as <%= h.changeCase.pascal(startNodeType) %>Node)