---
inject: true
to: src/specification/node-types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification.ts
before: "\n]"
skip_if: "RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>"
---
    [RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, {
        startNodeType: NodeType.<%= h.changeCase.pascal(startNodeType) %>,
        endNodeType: NodeType.<%= h.changeCase.pascal(endNodeType) %>,
        isReverseRelationship: false,
    }],