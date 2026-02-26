---
inject: true
to: tests/_toolbox/dbSeeding/seedNode.ts
before: "case DbNodeType.Image"
skip_if: return seed<%= h.changeCase.pascal(nodeType) %>
---
        case DbNodeType.<%= h.changeCase.pascal(nodeType) %>:
            return seed<%= h.changeCase.pascal(nodeType) %>(customFakeData)