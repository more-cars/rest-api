---
inject: true
to: bruno/lib/lib.js
skip_if: exports.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>
---
exports.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')