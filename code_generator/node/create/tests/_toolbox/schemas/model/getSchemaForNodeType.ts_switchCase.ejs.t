---
inject: true
to: tests/_toolbox/schemas/model/getSchemaForNodeType.ts
before: case NodeTypeEnum.IMAGE
skip_if: return <%= h.changeCase.pascal(nodeType) %>Schema
---
        case NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>:
            return <%= h.changeCase.pascal(nodeType) %>Schema