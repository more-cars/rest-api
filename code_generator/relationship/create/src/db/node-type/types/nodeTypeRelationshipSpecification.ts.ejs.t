---
inject: true
to: src/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification.ts
before: "}],\n]"
skip_if: import {<%= h.changeCase.pascal(startNodeType) %>RelationshipSpecification} from
---
    }],
    [DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, {
        startNodeLabel: NodeTypeLabel.<%= h.changeCase.pascal(startNodeType) %>,
        endNodeLabel: NodeTypeLabel.<%= h.changeCase.pascal(endNodeType) %>,
        relationshipName: RelationshipTypeNeo4j.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        isReverseRelationship: false,