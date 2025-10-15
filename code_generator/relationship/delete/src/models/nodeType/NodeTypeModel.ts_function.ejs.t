---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async delete<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    }

    static async delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id: number): Promise<void> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        }

        const relationship = await getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        if (!relationship) {
            throw new RelationshipNotFoundError(<%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        }

        await delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)