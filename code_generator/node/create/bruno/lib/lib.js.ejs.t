---
inject: true
to: bruno/lib/lib.js
before: exports.Images
skip_if: exports.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>
---
exports.<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %> = require('./<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js')