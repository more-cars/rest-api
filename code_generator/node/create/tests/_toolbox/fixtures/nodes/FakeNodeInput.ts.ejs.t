---
inject: true
to: tests/_toolbox/fixtures/nodes/FakeNodeType.ts
before: case NodeTypeEnum.IMAGE
skip_if: return Fake<%= h.changeCase.pascal(nodeType) %>
---
        case DbNodeType.<%= h.changeCase.pascal(nodeType) %>:
            return Fake<%= h.changeCase.pascal(nodeType) %>