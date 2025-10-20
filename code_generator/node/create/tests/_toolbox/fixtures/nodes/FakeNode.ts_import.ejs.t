---
inject: true
to: tests/_toolbox/fixtures/nodes/FakeNode.ts
before: \nexport function
skip_if: import Fake<%= h.changeCase.pascal(nodeType) %> from
---
import Fake<%= h.changeCase.pascal(nodeType) %> from "./Fake<%= h.changeCase.pascal(nodeType) %>"