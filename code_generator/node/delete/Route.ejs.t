---
inject: true
to: src/routes/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>.ts
at_line: 8
skip_if: <%= h.changeCase.pascal(nodetype) %>Controller.delete
---
router.delete('/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/:id', <%= h.changeCase.pascal(nodetype) %>Controller.delete)