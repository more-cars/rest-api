---
inject: true
to: src/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification.ts
before: "}],\n]"
skip_if: "RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
    }],
    [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, {
        startNodeLabel: NodeTypeLabel.<%= h.changeCase.pascal(startNodeType) %>,
        endNodeLabel: NodeTypeLabel.<%= h.changeCase.pascal(endNodeType) %>,
        relationshipName: RelationshipTypeNeo4j.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        isReverseRelationship: false,