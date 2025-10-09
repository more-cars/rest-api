---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
after: bru.setEnvVar("valid<%= h.changeCase.pascal(nodeType) %>Id", newNode.data.id)
skip_if: } //
---
        }