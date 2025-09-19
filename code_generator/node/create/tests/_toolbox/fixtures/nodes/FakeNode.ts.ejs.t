---
inject: true
to: tests/_toolbox/fixtures/nodes/FakeNode.ts
before: \}\n\}
skip_if: return Fake<%= h.changeCase.pascal(nodeType) %>
---
        case '<%= h.changeCase.lower(nodeType) %>':
            return Fake<%= h.changeCase.pascal(nodeType) %>