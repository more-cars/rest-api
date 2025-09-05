---
inject: true
to: src/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.has<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>/:<%= h.changeCase.kebab(endNodeType) %>Id', <%= h.changeCase.pascal(startNodeType) %>Controller.has<%= h.changeCase.pascal(relationshipName) %>Relation)