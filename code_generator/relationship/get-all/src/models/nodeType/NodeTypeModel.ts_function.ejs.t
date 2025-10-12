---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async getAll<%= h.changeCase.pascal(relationshipName) %>Relationships
---
    }

    static async getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id: number): Promise<Array<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship>> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        return getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id)