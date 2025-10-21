---
inject: true
to: tests/_toolbox/dbSeeding/seedNode.ts
before: import {seedImage}
skip_if: import {seed<%= h.changeCase.pascal(nodeType) %>} from
---
import {seed<%= h.changeCase.pascal(nodeType) %>} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"