---
inject: true
to: src/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(nodeType) %>Controller.getById
---
router.get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/:id', <%= h.changeCase.pascal(nodeType) %>Controller.getById)