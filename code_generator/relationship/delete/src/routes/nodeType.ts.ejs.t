---
inject: true
to: src/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.ts
before: \nexport default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.delete<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>/:<%= h.changeCase.camel(endNodeType) %>Id', <%= h.changeCase.pascal(startNodeType) %>Controller.delete<%= h.changeCase.pascal(relationshipName) %>Relation)