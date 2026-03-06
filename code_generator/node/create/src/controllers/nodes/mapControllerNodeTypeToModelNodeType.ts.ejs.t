---
inject: true
to: src/controllers/nodes/mapControllerNodeTypeToModelNodeType.ts
before: "ControllerNodeType.Image,"
skip_if: "ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>, ModelNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>, ModelNodeType.<%= h.changeCase.pascal(nodeType) %>],