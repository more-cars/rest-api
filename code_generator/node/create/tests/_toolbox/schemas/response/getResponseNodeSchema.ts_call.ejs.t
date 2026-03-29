---
inject: true
to: tests/_toolbox/schemas/response/getResponseNodeSchema.ts
before: "ControllerNodeType.Image"
skip_if: "ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>, <%= h.changeCase.pascal(nodeType) %>Schema],