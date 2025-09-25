---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Relationship.ts
before: \}
skip_if: "<%= h.changeCase.constant(relationshipName) %>"
---
    <%= h.changeCase.camel(relationshipName) %> = "<%= h.changeCase.constant(relationshipName) %>",