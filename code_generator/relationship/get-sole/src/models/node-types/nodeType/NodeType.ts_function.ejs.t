---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \},\n\}
skip_if: async get<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    },

    async get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number) {
        // checking that the node exists -> exception is thrown if not
        await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)

        const relationship = await getRel(<%= h.changeCase.camel(startNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, NodeTypeLabel.<%= h.changeCase.pascal(endNodeType) %>)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, null)
        }

        return relationship