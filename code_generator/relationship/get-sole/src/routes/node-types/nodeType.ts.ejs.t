---
inject: true
to: src/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>', <%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation)