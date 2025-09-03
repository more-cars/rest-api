---
inject: true
to: src/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.ts
after: <%= h.changeCase.pascal(startNodeType) %>Controller.create<%= h.changeCase.pascal(relationshipName) %>Relation
skip_if: <%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation
---
router.get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/:<%= h.changeCase.camel(startNodeType) %>Id/<%= h.changeCase.kebab(relationshipName) %>', <%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation)