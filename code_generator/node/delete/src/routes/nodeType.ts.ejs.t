---
inject: true
to: src/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(nodeType) %>Controller.delete
---
router.delete('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/:id', <%= h.changeCase.pascal(nodeType) %>Controller.delete)