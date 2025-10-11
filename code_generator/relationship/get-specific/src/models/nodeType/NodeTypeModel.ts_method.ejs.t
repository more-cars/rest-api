---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: static async get<%= h.changeCase.pascal(relationshipName) %>Relationship
skip_if: static async has<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    static async has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        const <%= h.changeCase.camel(endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(endNodeType) %>Id)

        if (!<%= h.changeCase.camel(startNodeType) %> || !<%= h.changeCase.camel(endNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const relation = await has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)

        if (!relation) {
            throw new RelationshipNotFoundError('<%= h.changeCase.lower(relationshipName) %>', <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        }

        return relation
    }
