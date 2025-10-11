---
inject: true
to: src/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>/:<%= h.changeCase.kebab(endNodeType) %>Id', <%= h.changeCase.pascal(startNodeType) %>Controller.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation)