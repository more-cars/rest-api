---
inject: true
to: tests/_toolbox/schemas/model/getSchemaForNodeType.ts
before: case NodeTypeEnum.IMAGE
skip_if: return Fake<%= h.changeCase.pascal(nodeType) %>
---
        case NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>:
            return <%= h.changeCase.pascal(nodeType) %>Schema