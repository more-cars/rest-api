---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Relationship.ts
before: \}
skip_if: "<%= h.changeCase.constant(relationshipName) %>"
---
    <%= h.changeCase.camel(relationshipName) %> = "<%= h.changeCase.constant(relationshipName) %>",