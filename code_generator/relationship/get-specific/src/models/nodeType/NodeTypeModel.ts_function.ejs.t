---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \},\n\}
skip_if: async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    },

    async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number) {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const <%= h.changeCase.camel(endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(endNodeType) %>Id)
        if (!<%= h.changeCase.camel(endNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(endNodeType) %>Id)
        }

        const relationship = await getSpecificRel(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (!relationship) {
            throw new RelationshipNotFoundError(<%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        }

        return relationship