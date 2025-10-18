---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async get<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    }

    static async get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number) {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const relationship = await getRelationship(<%= h.changeCase.camel(startNodeType) %>Id, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (!relationship) {
            throw new RelationshipNotFoundError(<%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, null)
        }

        return relationship