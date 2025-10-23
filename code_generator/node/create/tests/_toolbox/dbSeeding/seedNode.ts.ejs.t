---
inject: true
to: tests/_toolbox/dbSeeding/seedNode.ts
before: case NodeTypeEnum.IMAGE
skip_if: return seed<%= h.changeCase.pascal(nodeType) %>
---
        case NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>:
            return seed<%= h.changeCase.pascal(nodeType) %>(customFakeData)