---
inject: true
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification.ts
before: "\n]"
skip_if: "RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
    [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, {
        startNodeType: DbNodeType.<%= h.changeCase.pascal(startNodeType) %>,
        endNodeType: DbNodeType.<%= h.changeCase.pascal(endNodeType) %>,
        isReverseRelationship: false,
    }],