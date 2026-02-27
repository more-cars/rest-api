---
inject: true
to: tests/_toolbox/fixtures/nodes/getFakeNode.ts
before: "NodeType.Image"
skip_if: "NodeType.<%= h.changeCase.pascal(nodeType) %>, Fake<%= h.changeCase.pascal(nodeType) %>"
---
        [NodeType.<%= h.changeCase.pascal(nodeType) %>, Fake<%= h.changeCase.pascal(nodeType) %>],