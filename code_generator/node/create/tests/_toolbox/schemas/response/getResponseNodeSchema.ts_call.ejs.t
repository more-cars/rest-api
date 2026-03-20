---
inject: true
to: tests/_toolbox/schemas/response/getResponseNodeSchema.ts
before: "case ControllerNodeType.Image"
skip_if: "case ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>"
---
        [ControllerNodeType.<%= h.changeCase.pascal(nodeType) %>, <%= h.changeCase.pascal(nodeType) %>Schema],