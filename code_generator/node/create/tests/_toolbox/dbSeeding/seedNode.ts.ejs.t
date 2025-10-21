---
inject: true
to: tests/_toolbox/dbSeeding/seedNode.ts
before: case NodeTypeEnum.IMAGE
skip_if: return await seed<%= h.changeCase.pascal(customFakeData) %>
---
        case NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>:
            return await seed<%= h.changeCase.pascal(nodeType) %>(customFakeData)