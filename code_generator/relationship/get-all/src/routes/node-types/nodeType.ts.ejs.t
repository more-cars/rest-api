---
inject: true
to: src/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.getAll<%= h.changeCase.pascal(relationshipName) %>Relations
---
router.get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>', <%= h.changeCase.pascal(startNodeType) %>Controller.getAll<%= h.changeCase.pascal(relationshipName) %>Relations)