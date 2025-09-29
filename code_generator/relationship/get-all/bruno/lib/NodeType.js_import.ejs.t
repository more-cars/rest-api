---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(startNodeType)) %>.js
after:
skip_if: const {ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists}
---
const {ensureValid<%= h.changeCase.pascal(endNodeType) %>Exists} = require("./<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>")