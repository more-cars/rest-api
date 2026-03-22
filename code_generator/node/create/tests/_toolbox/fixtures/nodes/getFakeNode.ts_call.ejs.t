---
inject: true
to: tests/_toolbox/fixtures/nodes/getFakeNode.ts
before: "ExpectedNodeType.Image"
skip_if: "ExpectedNodeType.<%= h.changeCase.pascal(nodeType) %>, Fake<%= h.changeCase.pascal(nodeType) %>"
---
        [ExpectedNodeType.<%= h.changeCase.pascal(nodeType) %>, Fake<%= h.changeCase.pascal(nodeType) %>],