---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
after: newNode.data.id
skip_if: \} //
---
        } //