---
inject: true
to: src/controllers/nodes/convertModelNodeToControllerNode.ts
before: "case ModelNodeType.Image"
skip_if: "case ModelNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        case ModelNodeType.<%= h.changeCase.pascal(nodeType) %>:
            return convert<%= h.changeCase.pascal(nodeType) %>ModelNodeToControllerNode(modelNode as <%= h.changeCase.pascal(nodeType) %>Node)