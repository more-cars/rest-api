---
inject: true
to: tests/_toolbox/fixtures/nodes/FakeNodeInput.ts
before: import FakeImage from
skip_if: import {Fake<%= h.changeCase.pascal(nodeType) %>} from
---
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "./Fake<%= h.changeCase.pascal(nodeType) %>"