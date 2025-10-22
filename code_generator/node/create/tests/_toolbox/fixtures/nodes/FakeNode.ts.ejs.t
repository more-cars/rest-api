---
inject: true
to: tests/_toolbox/fixtures/nodes/FakeNodeInput.ts
before: case NodeTypeEnum.IMAGE
skip_if: return Fake<%= h.changeCase.pascal(nodeType) %>
---
        case NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>:
            return Fake<%= h.changeCase.pascal(nodeType) %>