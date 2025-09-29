---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async get<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    }

    static async get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number): Promise<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const relation = await get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!relation) {
            throw new RelationshipNotFoundError('<%= h.changeCase.lower(relationshipName) %>', <%= h.changeCase.camel(startNodeType) %>Id, null)
        }

        return relation