---
inject: true
to: src/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(nodeType) %>Controller.getAll
---
router.get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>', <%= h.changeCase.pascal(nodeType) %>Controller.getAll)