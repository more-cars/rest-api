---
inject: true
to: src/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.ts
before: export default router
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.create<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.post('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>/:<%= h.changeCase.kebab(endNodeType) %>Id', <%= h.changeCase.pascal(startNodeType) %>Controller.create<%= h.changeCase.pascal(relationshipName) %>Relation)